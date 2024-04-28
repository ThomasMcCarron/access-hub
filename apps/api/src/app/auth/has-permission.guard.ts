import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedGuard } from './authenticated.guard';
import { PermissionsService } from './permissions/permissions.service';
import { PermissionRelationTuple } from '@access-hub/nest-ory-client';

export function HasPermission(namespace: string, relation: string, object?: string) {
  return applyDecorators(
    SetMetadata('namespace', namespace),
    SetMetadata('relation', relation),
    SetMetadata('object', object),
    UseGuards(AuthenticatedGuard, HasPermissionGuard)
  );
}

@Injectable()
export class HasPermissionGuard implements CanActivate {
  private readonly logger = new Logger(HasPermissionGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @Inject(PermissionsService) private readonly permissionsService: PermissionsService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.debug(`${JSON.stringify(request.url)}`);
    const namespace = this.reflector.get<string>('namespace', context.getHandler());
    let object = this.reflector.get<string>('object', context.getHandler());

    if (!object) {
      if (namespace === 'roles' && request.params?.role != null) {
        object = request.params.role;
      } else if (request.params?.id != null) {
        object = request.params.id;
      }
    }

    if (!object) {
      this.logger.error(
        'Keto Object not set, it must be either the :id or :role param in the path or specified in the HasPermission decorator'
      );
      this.logger.error(`Request params: ${request.params}`);
      throw new HttpException('error.invalidObject', HttpStatus.FORBIDDEN);
    }

    const relation = this.reflector.get<string>('relation', context.getHandler());
    const userId: string = request.userId;

    const relationTuple = new PermissionRelationTuple({ namespace, object, relation, subject_id: userId });

    return this.permissionsService.checkPermission(relationTuple);
  }
}
