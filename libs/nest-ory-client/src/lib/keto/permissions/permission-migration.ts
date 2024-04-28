import { PermissionRelationTuple } from "./permission-relation-tuple";
import { IMigration } from "../interfaces";

export class PermissionsMigration implements IMigration {
  deletes: PermissionRelationTuple[];
  inserts: PermissionRelationTuple[];

  constructor(
    deletes: PermissionRelationTuple[],
    inserts: PermissionRelationTuple[]
  ) {
    this.deletes = deletes;
    this.inserts = inserts;
  }

  toString(): string {
    return `deletes:\n${this.deletes.map((rt) => `\t${rt}`).join('\n')}\ninserts:\n${this.inserts.map((rt) => `\t${rt}`).join('\n')}`;
  }
}
