import {
  RelationTupleDelta,
  TransactRelationTuplesRequest
} from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_pb";
import { RelationTuple } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb";
import { PermissionRelationTuple } from "../../../permissions/permission-relation-tuple";
import { getSubject } from "../get-subject.util";

export function toWriteRequest(tuple: PermissionRelationTuple): TransactRelationTuplesRequest {
  const requestTuple = new RelationTuple();
  requestTuple.setNamespace(tuple.namespace);
  requestTuple.setObject(tuple.object);
  requestTuple.setRelation(tuple.relation);
  requestTuple.setSubject(getSubject(tuple));

  const writeTupleDelta = new RelationTupleDelta();
  writeTupleDelta.setAction(RelationTupleDelta.Action.ACTION_INSERT);
  writeTupleDelta.setRelationTuple(requestTuple);

  const writeRequest = new TransactRelationTuplesRequest();
  writeRequest.addRelationTupleDeltas(writeTupleDelta);
  return writeRequest;
}
