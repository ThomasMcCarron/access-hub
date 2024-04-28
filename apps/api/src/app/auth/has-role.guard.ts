import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './authenticated.guard';
import { Role } from '@access-hub/api-interfaces';
import { HasPermissionGuard } from './has-permission.guard';

// Wrapper for the HasPermissionGuard which uses the predefined Role enum
export function HasRole(role?: Role) {
  return applyDecorators(
    SetMetadata('namespace', 'roles'),
    SetMetadata('relation', 'member'),
    SetMetadata('object', role),
    UseGuards(AuthenticatedGuard, HasPermissionGuard)
  );
}
