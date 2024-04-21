import { FindManyOptions } from 'typeorm';

export const enum ComplexCriteriaType {
  IS_NULL,
  IS_NOT_NULL,
  BETWEEN,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  LIKE,
}

export interface ComplexCriteriaProperty<P> {
  queryType: ComplexCriteriaType;
  field0?: P;
  field1?: P;
}

export declare type ComplexCriteria<Entity> = {
  [P in keyof Entity]?: ComplexCriteriaProperty<Entity[P]> | undefined;
};

export declare type SearchCriteria<Entity> = {
  criteria: FindManyOptions<Entity>;
  complexCriteria: ComplexCriteria<Entity>;
};
