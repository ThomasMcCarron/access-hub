import { PrimaryGeneratedColumn } from 'typeorm';
import { ApiEntity } from './api-entity.entity';

export abstract class PrimaryGeneratedUuidEntity extends ApiEntity<string> {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;
}
