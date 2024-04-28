import { PermissionRelationTuple } from "../../../permissions";
import { DeleteRelationTuplesRequest } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/write_service_pb";
import { getSubject } from "../get-subject.util";

// Convert PermissionRelationTuple to a DeleteRequest for the gRPC Keto Client
export function toDeleteRequest(tuple: PermissionRelationTuple): DeleteRelationTuplesRequest {
  const deleteRequest = new DeleteRelationTuplesRequest();
  const query = new DeleteRelationTuplesRequest.Query();
  query.setNamespace(tuple.namespace);
  query.setObject(tuple.object);
  query.setRelation(tuple.relation);
  query.setSubject(getSubject(tuple));
  deleteRequest.setQuery(query);
  return deleteRequest;
}
