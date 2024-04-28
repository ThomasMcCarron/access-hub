import { PermissionRelationTuple } from "../permissions";

export interface IMigration {
  deletes: PermissionRelationTuple[],
  inserts: PermissionRelationTuple[],
}
