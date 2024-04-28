import { ISubjectSet } from "./subject-set.interface";

export interface IRelationTuple {
  namespace?: string;
  object?: string;
  relation?: string;
  subject_id?: string | undefined;
  subject_set?: ISubjectSet | undefined;
}
