import { PermissionRelationTuple } from "./permission-relation-tuple";
import { PermissionsMigration } from "./permission-migration";

describe('PermissionsMigration', () => {
  const deleteTuple: PermissionRelationTuple = {
    namespace: 'my-namespace',
    object: 'my-object',
    relation: 'my-relation',
    subject_id: 'my-subject',
  };
  const insertTuple: PermissionRelationTuple = {
    namespace: 'my-namespace',
    object: 'my-object',
    relation: 'my-relation',
    subject_id: 'my-subject',
  };
  const permissionsMigration = new PermissionsMigration([deleteTuple], [insertTuple]);

  it('should have deletes and inserts properties set correctly', () => {
    expect(permissionsMigration.deletes).toEqual([deleteTuple]);
    expect(permissionsMigration.inserts).toEqual([insertTuple]);
  });

  it('should return a string representation of the object', () => {
    expect(permissionsMigration.toString()).toEqual(`deletes:\n\t${deleteTuple}\ninserts:\n\t${insertTuple}`);
  });
});
