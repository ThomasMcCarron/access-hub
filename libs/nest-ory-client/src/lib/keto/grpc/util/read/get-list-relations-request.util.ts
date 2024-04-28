import { CheckRequest } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb";
import { PermissionRelationTuple } from "../../../permissions";
import { getSubject } from "../get-subject.util";

// Convert PermissionRelationTuple to a CheckRequest for the gRPC Keto Client
export function toCheckRequest(tuple: PermissionRelationTuple): CheckRequest {
  const checkRequest = new CheckRequest();
  checkRequest.setNamespace(tuple.namespace);
  checkRequest.setObject(tuple.object);
  checkRequest.setRelation(tuple.relation);
  checkRequest.setSubject(getSubject(tuple));
  return checkRequest;
}
