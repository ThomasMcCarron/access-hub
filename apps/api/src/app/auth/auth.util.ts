import { User } from '../entities/user/user.entity';
import { IUser } from '@access-hub/api-interfaces';
import { Session } from '@ory/client';

export async function getUserFromSession(session: Session): Promise<Partial<IUser>> {
  if (!session.active) {
    throw new Error('error.getUserFromSession.sessionInactive');
  }
  if (!session.identity?.verifiable_addresses?.length) {
    throw new Error('error.getUserFromSession.noVerifiableAddresses');
  }
  return {
    id: session.identity?.id,
    firstName: session.identity?.traits?.name?.first,
    lastName: session.identity?.traits?.name?.last,
    email: session.identity?.verifiable_addresses[0].value,
    verified: session.identity?.verifiable_addresses[0].verified
  };
}

export function userDetailsNeedUpdating(user: User, details: IUser): boolean {
  return user.email !== details.email
    || user.verified !== details.verified
    || user.firstName !== details.firstName
    || user.lastName !== details.lastName;
}
