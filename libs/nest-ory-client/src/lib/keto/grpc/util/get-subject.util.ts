import { Subject, SubjectSet } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb";
import { PermissionRelationTuple } from "../../permissions";

export function getSubject(tuple: PermissionRelationTuple): Subject {
  const sub = new Subject();
  if (tuple.subject_id) {
    sub.setId(tuple.subject_id);
    return sub;
  } else if (tuple.subject_set) {
    const subjectSet = new SubjectSet();
    subjectSet.setNamespace(tuple.subject_set.namespace);
    subjectSet.setObject(tuple.subject_set.object);
    subjectSet.setRelation(tuple.subject_set.relation);
    sub.setSet(subjectSet);
    return sub;
  }
  throw new Error(`no subject set for tuple: ${JSON.stringify(tuple)}`);
}
