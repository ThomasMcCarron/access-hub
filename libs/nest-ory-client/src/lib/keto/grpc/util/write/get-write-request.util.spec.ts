import {
  RelationTupleDelta,
  TransactRelationTuplesRequest
} from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_pb";
import { RelationTuple } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb";
import { PermissionRelationTuple } from "../../../permissions";
import { getSubject } from "../get-subject.util";
import { toWriteRequest } from "./get-write-request.util";

describe('toWriteRequest', () => {
  it('should convert a tuple with subject_id to a write request', () => {
    const tupleWithSubjectId: PermissionRelationTuple = {
      namespace: 'namespace',
      object: 'object',
      relation: 'relation',
      subject_id: 'subject_id',
    };

    const expectedRequest = new TransactRelationTuplesRequest();
    const expectedDelta = new RelationTupleDelta();
    const expectedTuple = new RelationTuple();

    expectedTuple.setNamespace(tupleWithSubjectId.namespace);
    expectedTuple.setObject(tupleWithSubjectId.object);
    expectedTuple.setRelation(tupleWithSubjectId.relation);
    expectedTuple.setSubject(getSubject(tupleWithSubjectId));
    expectedDelta.setAction(RelationTupleDelta.Action.ACTION_INSERT);
    expectedDelta.setRelationTuple(expectedTuple);
    expectedRequest.addRelationTupleDeltas(expectedDelta);

    expect(toWriteRequest(tupleWithSubjectId)).toEqual(expectedRequest);
  });

  it('should convert a tuple with subject_set to a write request', () => {
    const tupleWithSubjectSet: PermissionRelationTuple = {
      namespace: 'namespace',
      object: 'object',
      relation: 'relation',
      subject_set: {
        namespace: 'subjectNamespace',
        object: 'subjectObject',
        relation: 'subjectRelation'
      }
    };

    const expectedRequest = new TransactRelationTuplesRequest();
    const expectedDelta = new RelationTupleDelta();
    const expectedTuple = new RelationTuple();
    expectedTuple.setNamespace(tupleWithSubjectSet.namespace);
    expectedTuple.setObject(tupleWithSubjectSet.object);
    expectedTuple.setRelation(tupleWithSubjectSet.relation);
    expectedTuple.setSubject(getSubject(tupleWithSubjectSet));
    expectedDelta.setAction(RelationTupleDelta.Action.ACTION_INSERT);
    expectedDelta.setRelationTuple(expectedTuple);
    expectedRequest.addRelationTupleDeltas(expectedDelta);

    expect(toWriteRequest(tupleWithSubjectSet)).toEqual(expectedRequest);
  });
});
