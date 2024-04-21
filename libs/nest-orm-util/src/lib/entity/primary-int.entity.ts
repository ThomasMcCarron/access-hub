import { ApiEntity } from './api-entity.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class PrimaryIntEntity extends ApiEntity<number> {
  @PrimaryGeneratedColumn()
  override id!: number;
}
