import { KetoClient } from "../keto-client.abstract";
import { PermissionRelationTuple } from "../permissions";
import { CheckResponse } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb";
import { ServiceError } from "@grpc/grpc-js";
import { CheckServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb";
import { WriteServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_grpc_pb";
import {
  DeleteRelationTuplesResponse,
  TransactRelationTuplesResponse
} from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_pb";
import { parseGRPCCheckResponse, toCheckRequest, toDeleteRequest, toWriteRequest } from "./util";
import { InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import { ReadServiceClient } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/read_service_grpc_pb";

export class KetoGrpcClient extends KetoClient {
  constructor(
    private readonly writeClient: WriteServiceClient,
    private readonly checkClient: CheckServiceClient,
    private readonly readClient: ReadServiceClient,
    private readonly retryCount?: number
  ) {
    super(retryCount);
  }

  async queryRelation(pageToken: string, pageSize: number, rt: PermissionRelationTuple): Promise<PermissionRelationTuple[]> {
    throw new NotImplementedException();
  }

  async queryNamespaces(): Promise<{ name: string }[]> {
    throw new NotImplementedException();
  }

  async query(rt: PermissionRelationTuple): Promise<boolean> {
    return parseGRPCCheckResponse(this.retryPermissionQuery<CheckResponse, CheckServiceClient>(this.checkTuple, this.checkClient, rt), rt);
  }

  private async queryTuple(client: CheckServiceClient, rt: PermissionRelationTuple): Promise<CheckResponse> {
    // Map the callback to a promise
    return new Promise<CheckResponse>(
      (resolve, reject) => client.check(toCheckRequest(rt),
        (error: ServiceError, response: CheckResponse) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        })
    );
  }

  async check(rt: PermissionRelationTuple): Promise<boolean> {
    return parseGRPCCheckResponse(this.retryPermissionQuery<CheckResponse, CheckServiceClient>(this.checkTuple, this.checkClient, rt), rt);
  }

  private async checkTuple(client: CheckServiceClient, rt: PermissionRelationTuple): Promise<CheckResponse> {
    // Map the callback to a promise
    return new Promise<CheckResponse>(
      (resolve, reject) => client.check(toCheckRequest(rt),
        (error: ServiceError, response: CheckResponse) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        })
    );
  }

  async checkAdmin(rt: PermissionRelationTuple): Promise<boolean> {
    const adminRt = rt;
    adminRt.object = "*";
    return this.check(adminRt);
  }

  async delete(rt: PermissionRelationTuple): Promise<void> {
    return this.retryPermissionQuery<DeleteRelationTuplesResponse, WriteServiceClient>(this.deleteTuple, this.writeClient, rt)
      .then(() => {
        console.debug(`Deleted tuple '${rt}'`);
        return;
      })
      .catch((error) => {
        console.error("Error deleting permission", JSON.stringify(error));
        throw new InternalServerErrorException("error.deletePermission");
      });
  }

  private async deleteTuple(client: WriteServiceClient, rt: PermissionRelationTuple): Promise<DeleteRelationTuplesResponse> {
    // Map the callback to a promise
    return new Promise<DeleteRelationTuplesResponse>(
      (resolve, reject) => client.deleteRelationTuples(toDeleteRequest(rt),
        (error: ServiceError, response: DeleteRelationTuplesResponse) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        })
    );
  }


  async write(rt: PermissionRelationTuple): Promise<void> {
    return this.retryPermissionQuery<TransactRelationTuplesResponse, WriteServiceClient>(this.writeTuple, this.writeClient, rt)
      .then((res) => {
        console.debug(`Created tuple '${rt}'`);
        return;
      })
      .catch((error) => {
        console.error("Error writing permission", JSON.stringify(error));
        throw new InternalServerErrorException("error.writePermission");
      });
  }

  private async writeTuple(client: WriteServiceClient, rt: PermissionRelationTuple) {
    await new Promise<DeleteRelationTuplesResponse>(
      (resolve, reject) => client.deleteRelationTuples(toDeleteRequest(rt),
        (error: ServiceError, response: DeleteRelationTuplesResponse) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        })
    ).then(() => {
      console.debug(`Deleted tuple '${rt}'`);
      return;
    }).catch((error) => {
      console.error("Error deleting before writing permission", JSON.stringify(error));
      throw new InternalServerErrorException("error.deletePermission");
    });

    // Map the callback to a promise
    return new Promise<TransactRelationTuplesResponse>(
      (resolve, reject) => client.transactRelationTuples(toWriteRequest(rt),
        (error: ServiceError, response: TransactRelationTuplesResponse) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        })
    );
  }
}
