import { PermissionRelationTuple } from "../../../permissions";
import { DeleteRelationTuplesRequest } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_pb";
import { Subject, SubjectSet } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb";
import { toDeleteRequest } from "./get-delete-request.util";

describe("toDeleteRequest", () => {
  it("should create a valid DeleteRelationTuplesRequest from a PermissionRelationTuple with a subject_id", () => {
    const tuple = new PermissionRelationTuple({
      namespace: "test-ns",
      object: "test-object",
      relation: "test-relation",
      subject_id: "test-subject-id"
    });
    const expectedRequest = new DeleteRelationTuplesRequest();

    const expectedQuery = new DeleteRelationTuplesRequest.Query();
    expectedQuery.setNamespace("test-ns");
    expectedQuery.setObject("test-object");
    expectedQuery.setRelation("test-relation");

    const expectedSubject = new Subject();
    expectedSubject.setId('test-subject-id');

    expectedQuery.setSubject(expectedSubject);

    expectedRequest.setQuery(expectedQuery);
    expect(toDeleteRequest(tuple)).toEqual(expectedRequest);
  });

  it("should create a valid DeleteRelationTuplesRequest from a PermissionRelationTuple with a subject_set", () => {
    const tuple = new PermissionRelationTuple({
      namespace: "test-ns",
      object: "test-object",
      relation: "test-relation",
      subject_set: {
        namespace: "test-subject-ns",
        object: "test-subject-object",
        relation: "test-subject-relation"
      }
    });
    const expectedRequest = new DeleteRelationTuplesRequest();
    const expectedQuery = new DeleteRelationTuplesRequest.Query();
    expectedQuery.setNamespace("test-ns");
    expectedQuery.setObject("test-object");
    expectedQuery.setRelation("test-relation");

    const expectedSubject = new Subject();
    const expectedSubjectSet = new SubjectSet();
    expectedSubjectSet.setNamespace("test-subject-ns");
    expectedSubjectSet.setObject("test-subject-object");
    expectedSubjectSet.setRelation("test-subject-relation");
    expectedSubject.setSet(expectedSubjectSet);
    expectedQuery.setSubject(expectedSubject);

    expectedRequest.setQuery(expectedQuery);
    expect(toDeleteRequest(tuple)).toEqual(expectedRequest);
  });
});
