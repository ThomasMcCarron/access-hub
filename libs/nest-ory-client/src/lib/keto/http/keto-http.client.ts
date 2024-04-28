import { KetoClient } from "../keto-client.abstract";
import { PermissionRelationTuple } from "../permissions/permission-relation-tuple";
import { NotImplementedException } from "@nestjs/common";

export class KetoHttpClient extends KetoClient {
  constructor(
    private readonly retryCount?: number
  ) {
    super(retryCount);
  }

  async check(rt: PermissionRelationTuple): Promise<boolean> {
    throw new NotImplementedException();
  }

  async checkAdmin(rt: PermissionRelationTuple): Promise<boolean> {
    const adminRt = rt;
    adminRt.object = "*";
    return this.check(adminRt);
  }

  async delete(rt: PermissionRelationTuple): Promise<void> {
    throw new NotImplementedException();
  }


  async write(rt: PermissionRelationTuple): Promise<void> {
    throw new NotImplementedException();
  }

  queryNamespaces(): Promise<{ name: string }[]> {
    throw new NotImplementedException();
  }

  queryRelation(pageToken, rt: PermissionRelationTuple): Promise<PermissionRelationTuple[]> {
    throw new NotImplementedException();
  }
}
