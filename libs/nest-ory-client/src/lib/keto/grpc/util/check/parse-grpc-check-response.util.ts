import { CheckResponse } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb";
import { PermissionRelationTuple } from "../../../permissions";
import { ServiceError } from "@grpc/grpc-js";

export async function parseGRPCCheckResponse(response: Promise<CheckResponse>, rt: PermissionRelationTuple): Promise<boolean> {
  return await response
    .then((response: CheckResponse) => {
      console.debug(`${rt} ${response.getAllowed() ? 'ALLOWED' : 'DENIED'}`);
      return response.getAllowed();
    })
    .catch((error: ServiceError) => {
      console.error(`Error with gRPC Keto check request: ${error.code} ${error.name} ${error.message}`);
      return false;
    });
}
