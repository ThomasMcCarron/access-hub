import { Subject, SubjectSet } from "@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb";
import { PermissionRelationTuple } from "../../permissions";
import { getSubject } from "./get-subject.util";

describe('getSubject', () => {
  test('returns a subject with ID when tuple has subject_id', () => {
    const tupleWithSubjectId: PermissionRelationTuple = {
      namespace: 'namespace',
      object: 'object',
      relation: 'relation',
      subject_id: 'subject_id',
    };
    const subject = getSubject(tupleWithSubjectId);
    expect(subject).toBeInstanceOf(Subject);
    expect(subject.getId()).toBe('subject_id');
  });

  test('returns a subject with a subject set when tuple has subject_set', () => {
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
    const subject = getSubject(tupleWithSubjectSet);
    expect(subject).toBeInstanceOf(Subject);
    const subjectSet = subject.getSet();
    expect(subjectSet).toBeInstanceOf(SubjectSet);
    expect(subjectSet.getNamespace()).toBe('subjectNamespace');
    expect(subjectSet.getObject()).toBe('subjectObject');
    expect(subjectSet.getRelation()).toBe('subjectRelation');
  });

  test('throws an error when tuple has no subject set', () => {
    const tupleWithoutSubject: PermissionRelationTuple = {
      namespace: 'namespace',
      object: 'object',
      relation: 'relation',
    };
    expect(() => {
      getSubject(tupleWithoutSubject);
    }).toThrow(`no subject set for tuple: ${JSON.stringify(tupleWithoutSubject)}`);
  });
});
