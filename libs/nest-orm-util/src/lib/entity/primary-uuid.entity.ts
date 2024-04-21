import { ApiEntity } from './api-entity.entity';
import { PrimaryColumn } from 'typeorm';

export abstract class PrimaryUuidEntity extends ApiEntity<string> {
  @PrimaryColumn({ type: 'uuid' })
  override id!: string;
}
