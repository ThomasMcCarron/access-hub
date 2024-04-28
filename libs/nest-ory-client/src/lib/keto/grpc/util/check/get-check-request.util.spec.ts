import { PermissionRelationTuple } from "../../../permissions";
import { CheckRequest } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb";
import { toCheckRequest } from "./get-check-request.util";
import { Subject, SubjectSet } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb";

describe("toCheckRequest", () => {
  it("should convert a PermissionRelationTuple with subject_id to a CheckRequest", () => {
    const tuple: PermissionRelationTuple = new PermissionRelationTuple({
        namespace: "myNamespace",
        object: "myObject",
        relation: "relatedTo",
        subject_id: "12345"
    });
    const expectedCheckRequest = new CheckRequest();
    expectedCheckRequest.setNamespace("myNamespace");
    expectedCheckRequest.setObject("myObject");
    expectedCheckRequest.setRelation("relatedTo");

    const expectedSubject = new Subject();
    expectedSubject.setId("12345");
    expectedCheckRequest.setSubject(expectedSubject);

    const actualCheckRequest = toCheckRequest(tuple);
    expect(actualCheckRequest).toEqual(expectedCheckRequest);
  });

  it("should convert a PermissionRelationTuple with subject_set to a CheckRequest", () => {
    const tuple: PermissionRelationTuple = new PermissionRelationTuple({
      namespace: "myNamespace",
      object: "myObject",
      relation: "relatedTo",
      subject_set: {
        namespace: "setNamespace",
        object: "setObject",
        relation: "setRelation"
      }
    });
    const expectedCheckRequest = new CheckRequest();
    expectedCheckRequest.setNamespace("myNamespace");
    expectedCheckRequest.setObject("myObject");
    expectedCheckRequest.setRelation("relatedTo");

    const expectedSubject = new Subject();
    const expectedSubjectSet = new SubjectSet();
    expectedSubjectSet.setNamespace("setNamespace");
    expectedSubjectSet.setObject("setObject");
    expectedSubjectSet.setRelation("setRelation");
    expectedSubject.setSet(expectedSubjectSet);
    expectedCheckRequest.setSubject(expectedSubject);

    const actualCheckRequest = toCheckRequest(tuple);
    expect(actualCheckRequest).toEqual(expectedCheckRequest);
  });
});
