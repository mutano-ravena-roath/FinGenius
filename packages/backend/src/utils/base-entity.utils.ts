import {
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
} from "typeorm";
import { Exclude } from "class-transformer";
////////////////////////////////////////////////////////////////////////////////

/**
 * Base entity class includes common fields and hooks
 * @see https://typeorm.io/entity-inheritance
 *
 * @property {number} id - primary key
 * @property {boolean} isActive - soft delete flag
 * @property {Date} createdAt - created date
 * @property {Date} updatedAt - updated date
 * @property {Date} deletedAt - deleted date
 * @property {number} version - optimistic concurrency control
 */
export abstract class SQLBaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;

  @Exclude()
  @VersionColumn()
  version: number;
}
