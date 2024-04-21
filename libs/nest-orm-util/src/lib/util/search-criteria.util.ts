import {
  Between,
  FindManyOptions,
  FindOperator,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import {
  ComplexCriteria,
  ComplexCriteriaProperty,
  ComplexCriteriaType,
  SearchCriteria
} from '@access-hub/shared-orm-util';

export declare type ParsedComplexCriteria<Entity> = {
  [P in keyof Entity]?: FindOperator<Entity[P]>;
};

export function searchCriteriaToFindOptions<Entity>(
  searchCriteria: SearchCriteria<Entity>
): FindManyOptions<Entity> {
  const criteria = searchCriteria.criteria;
  const parsedComplexCriteria = parseComplexCriteria<Entity>(
    searchCriteria.complexCriteria
  );
  console.debug(
    'Parsed complex criteria',
    JSON.stringify(parsedComplexCriteria)
  );
  // TODO: Figure out typing
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  criteria.where = { ...criteria.where, ...parsedComplexCriteria };
  return criteria;
}

// Parses the complex criteria into TypeORM compatible Find Operators
export function parseComplexCriteria<Entity>(
  criteria: ComplexCriteria<Entity>
): ParsedComplexCriteria<Entity> {
  return Object.keys(criteria).reduce(function (result, key) {
    // TODO: Figure out typing
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    result[key] = complexCriteriaPropertyToFindOperator(criteria[key]);
    return result;
  }, {});
}

// Converts a complex criteria property to a TypeORM Find Operator
export function complexCriteriaPropertyToFindOperator<P>(
  complexCriteria: ComplexCriteriaProperty<P>
): FindOperator<P> {
  switch (complexCriteria.queryType) {
    case ComplexCriteriaType.IS_NULL:
      return IsNull();
    case ComplexCriteriaType.IS_NOT_NULL:
      return Not(IsNull());
    case ComplexCriteriaType.BETWEEN:
      if (
        complexCriteria.field0 === undefined ||
        complexCriteria.field1 === undefined
      ) {
        throw new BadRequestException(
          'error.invalidCriteria.between',
          `Between field is undefined. start: ${complexCriteria.field0} end: ${complexCriteria.field1}`
        );
      }
      return Between<P>(complexCriteria.field0, complexCriteria.field1);
    case ComplexCriteriaType.LESS_THAN:
      if (complexCriteria.field0 === undefined) {
        throw new BadRequestException(
          'error.invalidCriteria.lessThan',
          `Less Than field is undefined`
        );
      }
      return LessThan<P>(complexCriteria.field0);
    case ComplexCriteriaType.LESS_THAN_OR_EQUAL:
      if (complexCriteria.field0 === undefined) {
        throw new BadRequestException(
          'error.invalidCriteria.lessThanOrEqual',
          `Less Than Or Equal field is undefined`
        );
      }
      return LessThanOrEqual<P>(complexCriteria.field0);
    case ComplexCriteriaType.GREATER_THAN:
      if (complexCriteria.field0 === undefined) {
        throw new BadRequestException(
          'error.invalidCriteria.greaterThan',
          `Greater Than field is undefined`
        );
      }
      return MoreThan<P>(complexCriteria.field0);
    case ComplexCriteriaType.GREATER_THAN_OR_EQUAL:
      if (complexCriteria.field0 === undefined) {
        throw new BadRequestException(
          'error.invalidCriteria.greaterThanOrEqual',
          `Greater Than Or Equal field is undefined`
        );
      }
      return MoreThanOrEqual<P>(complexCriteria.field0);
    case ComplexCriteriaType.LIKE:
      if (complexCriteria.field0 === undefined) {
        throw new BadRequestException(
          'error.invalidCriteria.like',
          `Like field is undefined`
        );
      }
      return Like<P>(complexCriteria.field0);
    default:
      throw Error('Unhandled complex criteria type');
  }
}
