import { IRelationTuple, ISubjectSet } from "../interfaces";

interface PermissionRelationTupleProps {
  namespace?: string;
  object?: string;
  relation?: string;
  subject_id?: string;
  subject_set?: ISubjectSet;
}

export class PermissionRelationTuple implements IRelationTuple {
  namespace?: string;
  object?: string;
  relation?: string;
  subject_id?: string;
  subject_set?: ISubjectSet;

  // TODO: Make it so only one of subject_id or subject_set can be set
  // https://www.youtube.com/watch?v=9i38FPugxB8
  constructor(
    {
      namespace,
      object,
      relation,
      subject_id,
      subject_set
    }: PermissionRelationTupleProps
  ) {
    if (!subject_id && !subject_set) {
      throw new Error("PermissionRelationTuple has no subject");
    }

    this.namespace = namespace;
    this.object = object;
    this.relation = relation;
    this.subject_id = subject_id;
    this.subject_set = subject_set;
  }

  public toString(): string {
    let subjectString = '';
    if (this.subject_id) {
      subjectString = this.subject_id;
    } else if (this.subject_set) {
      subjectString = `${this.subject_set.namespace}:${this.subject_set.object}#${this.subject_set.relation}`;
    }
    return `${this.namespace}:${this.object}#${this.relation}@${subjectString}`;
  }
}
