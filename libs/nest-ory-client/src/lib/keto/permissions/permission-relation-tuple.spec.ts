import { PermissionRelationTuple } from "./permission-relation-tuple";

describe("PermissionRelationTuple", () => {
  /* TODO: Determine if wide-scope permission operations should be allowed, e.g. clearing all permissions for a migration */
  it("should throw an error if both subject_id and subject_set are not set", () => {
    expect(() => {
      new PermissionRelationTuple({
        namespace: "myNamespace",
        object: "myObject",
        relation: "relatedTo",
      });
    }).toThrowError("PermissionRelationTuple has no subject");
  });

  it("should not throw an error if subject_id is set", () => {
    expect(() => {
      new PermissionRelationTuple({
        namespace: "myNamespace",
        object: "myObject",
        relation: "relatedTo",
        subject_id: "12345",
      });
    }).not.toThrow();
  });

  it("should not throw an error if subject_set is set", () => {
    expect(() => {
      new PermissionRelationTuple({
        namespace: "myNamespace",
        object: "myObject",
        relation: "relatedTo",
        subject_set: {
          namespace: "mySubjectNamespace",
          object: "mySubjectObject",
          relation: "relatedTo",
        },
      });
    }).not.toThrow();
  });
});
