import { Injectable } from '@nestjs/common';
import { InjectKetoClient, KetoClient, PermissionRelationTuple } from '@access-hub/nest-ory-client';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectKetoClient() private readonly ketoClient: KetoClient,
  ) {}

  public async deletePermissions(rts: PermissionRelationTuple[]) {
    for (const rt of rts) {
      await this.ketoClient.delete(rt);
    }
  }

  public async deletePermission(rt: PermissionRelationTuple) {
    await this.ketoClient.delete(rt);
  }

  public async writePermissions(rts: PermissionRelationTuple[]) {
    for (const rt of rts) {
      await this.writePermission(rt);
    }
  }

  public async writePermission(rt: PermissionRelationTuple) {
    await this.ketoClient.write(rt);
  }

  public async checkPermission(rt: PermissionRelationTuple): Promise<boolean> {
    return (
      (await this.ketoClient.check(rt) || await this.ketoClient.checkAdmin(rt))
    );
  }
}
