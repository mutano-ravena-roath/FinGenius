import { NotFoundException, BadRequestException } from "@nestjs/common";
import { ObjectLiteral, Repository, DataSource, EntityTarget } from "typeorm";
////////////////////////////////////////////////////////////////////////////////

/**
 * Base service class for all services.
 *
 * @method insertEntity - inserts entity into database
 * @method setRelation - sets relation of type many-to-one (MTO) between entities
 * @method addRelation - adds relation of type many-to-many (MTM) or one-to-many (OTM) between entities
 * @method findOne - finds one entity in database
 * @method findAll - finds all entities in database
 * @method update - updates entity in database
 * @method delete - deletes entity from database
 */
export abstract class BaseService<T extends ObjectLiteral> {
  private readonly tableName: string;

  protected constructor(
    protected readonly repository: Repository<T>,
    protected readonly dataSource: DataSource
  ) {
    this.tableName = repository.metadata.tableName;
  }

  /**
   * Inserts entity into database.
   *
   * @param entityLike - entity to insert
   * @returns {Promise<T>} inserted entity
   * @throws {BadRequestException} if queryRunner fails to initialize
   * @throws {BadRequestException} if error occurs during transaction
   */
  async insertEntity(entityLike: T): Promise<T> {
    // connect to database
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    if (!queryRunner)
      throw new BadRequestException("QueryRunner not initialized");

    await queryRunner.startTransaction();

    try {
      // fulfill transaction
      const entity = await queryRunner.manager.save(entityLike);
      await queryRunner.commitTransaction();
      return entity;
    } catch (err) {
      // rollback changes made in case of error
      console.error(err.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err.message);
    } finally {
      // release queryRunner after transaction
      await queryRunner.release();
    }
  }

  /**
   * Sets relation of type many-to-one (MTO) between entities.
   *
   * @param entityTarget entity to set relation to
   * @param propertyPath property path of relation
   * @param entity entity to set relation from
   * @param value value to set relation to
   * @returns {Promise<void>} nothing
   * @throws {BadRequestException} if entity is not valid
   */
  async setRelation(
    entityTarget: EntityTarget<T>,
    propertyPath: string,
    entity: T,
    value: any
  ): Promise<void> {
    try {
      await this.repository
        .createQueryBuilder()
        .relation(entityTarget, propertyPath)
        .of(entity)
        .set(value);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Adds relation of type many-to-many (MTM) or one-to-many (OTM) between entities.
   *
   * @param entityTarget entity to add relation to
   * @param propertyPath property path of relation
   * @param entity entity to add relation from
   * @param value value to add relation to
   * @returns {Promise<void>} nothing
   * @throws {BadRequestException} if entity is not valid
   */
  async addRelation(
    entityTarget: EntityTarget<T>,
    propertyPath: string,
    entity: T,
    value: any
  ): Promise<void> {
    try {
      await this.repository
        .createQueryBuilder()
        .relation(entityTarget, propertyPath)
        .of(entity)
        .add(value);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Finds one entity in database.
   *
   * @param keys - array of keys to search by
   * @param values - array of values to search by
   * @param relations - array of relations to load
   * @param map - boolean value indicating whether to map relations or not
   * @returns {Promise<T | null>} found entity or null
   * @throws {BadRequestException} if keys are provided without values
   * @throws {BadRequestException} if error occurs during database query
   */
  async findOne(
    keys?: string[],
    values?: (string | number | boolean)[],
    relations?: string[],
    map?: boolean
  ): Promise<T | null> {
    try {
      if (keys && !values)
        throw new NotFoundException(
          "Keys provided without values. Process aborted."
        );

      const queryBuilder = this.repository.createQueryBuilder(this.tableName);

      if (keys && values)
        keys.forEach((key, i) => {
          const value = values[i];
          if (value != null && value !== "" && value !== "null") {
            queryBuilder.andWhere(`${this.tableName}.${key} = :${key}`, {
              [key]: value,
            });
          } else {
            queryBuilder.andWhere(`${this.tableName}.${key} IS NULL`);
          }
        });

      for (const relation of relations ?? []) {
        map
          ? queryBuilder.leftJoinAndSelect(
              `${this.tableName}.${relation}`,
              relation
            )
          : queryBuilder.loadRelationIdAndMap(
              `${relation}Ref`,
              `${this.tableName}.${relation}`
            );
      }

      return await queryBuilder.getOne();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Finds all entities in database.
   *
   * @param keys - array of keys to search by
   * @param values - array of values to search by
   * @param relations - array of relations to load
   * @param map - boolean value indicating whether to map relations or not
   * @returns {Promise<T[]>} found entities
   * @throws {BadRequestException} if keys are provided without values
   * @throws {BadRequestException} if error occurs during database query
   */
  async findAll(
    keys?: string[],
    values?: (string | number | boolean)[],
    relations?: string[],
    map?: boolean
  ): Promise<T[]> {
    try {
      if (keys && !values)
        throw new NotFoundException(
          "Keys provided without values. Process aborted."
        );

      const queryBuilder = this.repository.createQueryBuilder(this.tableName);

      if (keys && values)
        keys.forEach((key, i) => {
          const value = values[i];
          if (value != null && value !== "" && value !== "null") {
            queryBuilder.andWhere(`${this.tableName}.${key} = :${key}`, {
              [key]: value,
            });
          } else {
            queryBuilder.andWhere(`${this.tableName}.${key} IS NULL`);
          }
        });

      for (const relation of relations ?? []) {
        map
          ? queryBuilder.leftJoinAndSelect(
              `${this.tableName}.${relation}`,
              relation
            )
          : queryBuilder.loadRelationIdAndMap(
              `${relation}Ref`,
              `${this.tableName}.${relation}`
            );
      }

      return await queryBuilder.getMany();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Updates entity in database.
   *
   * @param id - ID of entity to update
   * @param updateDto - DTO with updated entity data
   * @returns {Promise<T | null>} updated entity
   * @throws {NotFoundException} if entity with given ID was not found
   */
  async update(id: number, updateDto: any): Promise<T> {
    const data = await this.repository
      .createQueryBuilder()
      .update()
      .set(updateDto)
      .where("id = :id", { id })
      .execute();

    // check if entity with given ID was updated
    if (!data.affected) throw new NotFoundException("Entity not found.");

    return (await this.findOne(["id"], [id])) as T;
  }

  /**
   * Deletes entity from database.
   *
   * @param id - ID of entity to delete
   * @returns {Promise<void>} nothing
   * @throws {NotFoundException} if entity with given ID was not found
   */
  async delete(id: number): Promise<void> {
    const entity = await this.findOne(["id"], [id]);
    if (!entity) throw new NotFoundException("Entity not found.");

    await this.repository
      .createQueryBuilder()
      .delete()
      .from(this.tableName)
      .where("id = :id", { id })
      .execute();
  }
}
