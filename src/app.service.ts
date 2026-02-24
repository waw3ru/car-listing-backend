import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { BunSQLDatabase } from 'drizzle-orm/bun-sql';
import { and } from 'node_modules/drizzle-orm/sql/expressions/index.cjs';
import { PaginationQueryValidationType } from './common/validations';
import { DB } from './database/database.module';
import * as schemas from './database/database.schemas';
import {
  CarInsertType,
  CarMakeInsertType,
  CarModelInsertType,
} from './database/schema.types';

@Injectable()
export class AppService {
  constructor(@Inject(DB) private db: BunSQLDatabase<typeof schemas>) {}

  async query($q: PaginationQueryValidationType) {
    let q = this.db
      .select({
        id: schemas.carSchema.id,
        name: schemas.carSchema.name,
        carMake: schemas.carMakeSchema,
        carModel: schemas.carModelSchema,
        yearOfManufacture: schemas.carSchema.yearOfManufacture,
        color: schemas.carSchema.color,
        imageUrl: schemas.carSchema.imageUrl,
        vipStatus: schemas.carSchema.vipStatus,
        purchaseStatus: schemas.carSchema.purchaseStatus,
        minPrice: schemas.carSchema.minPrice,
        createdOn: schemas.carSchema.createdOn,
        updatedOn: schemas.carSchema.updatedOn,
      })
      .from(schemas.carSchema)
      .leftJoin(
        schemas.carMakeSchema,
        eq(schemas.carSchema.carMake, schemas.carMakeSchema.id),
      )
      .leftJoin(
        schemas.carModelSchema,
        eq(schemas.carSchema.carModel, schemas.carModelSchema.id),
      )
      .limit($q.pageSize)
      .offset(($q.page - 1) * $q.pageSize)
      .groupBy(
        schemas.carSchema.id,
        schemas.carMakeSchema.id,
        schemas.carModelSchema.id,
      );

    const filters = this.#applyFilters($q);
    if (filters) q = q.where(filters as any) as never;

    return {
      output: await q,
      rowsCount: filters
        ? await this.db.$count(schemas.carSchema, filters as any)
        : await this.db.$count(schemas.carSchema),
    };
  }

  createCarMake(data: CarMakeInsertType) {
    return this.db.insert(schemas.carMakeSchema).values(data);
  }

  updateCarMake(id: string, data: CarMakeInsertType) {
    return this.db
      .update(schemas.carMakeSchema)
      .set(data)
      .where(eq(schemas.carMakeSchema.id, id));
  }

  createCarModel(data: CarModelInsertType) {
    return this.db.insert(schemas.carModelSchema).values(data);
  }

  updateCarModel(id: string, data: CarModelInsertType) {
    return this.db
      .update(schemas.carModelSchema)
      .set(data)
      .where(eq(schemas.carModelSchema.id, id));
  }

  createCar(data: CarInsertType) {
    return this.db.insert(schemas.carSchema).values(data);
  }

  updateCar(id: string, data: CarInsertType) {
    return this.db
      .update(schemas.carSchema)
      .set(data)
      .where(eq(schemas.carSchema.id, id));
  }

  getCarMakes() {
    return this.db.select().from(schemas.carMakeSchema);
  }

  getCarModels(makeId: string) {
    return this.db
      .select()
      .from(schemas.carModelSchema)
      .where(eq(schemas.carModelSchema.carMake, makeId));
  }

  /**
   * Checks the health of the application.
   * @returns {void}
   */
  healthcheck() {
    return {
      health: 'OK',
      timestamp: new Date(),
    };
  }

  #applyFilters(
    $q: Pick<
      PaginationQueryValidationType,
      'minPrice' | 'maxPrice' | 'model' | 'make' | 'year' | 'searchTerm'
    >,
  ) {
    const condition = [] as any;

    if ($q.model) {
      condition.push(eq(schemas.carSchema.carModel, $q.model));
    }
    if ($q.make) {
      condition.push(eq(schemas.carSchema.carMake, $q.make));
    }
    if ($q.year) {
      condition.push(sql`${schemas.carSchema.yearOfManufacture} = ${$q.year}}`);
    }
    if ($q.maxPrice) {
      condition.push(sql`${schemas.carSchema.minPrice} <= ${$q.maxPrice}`);
    }
    if ($q.minPrice) {
      condition.push(sql`${schemas.carSchema.minPrice} >= ${$q.minPrice}`);
    }

    if ($q.searchTerm) {
      condition.push(
        sql`${schemas.carSchema.name} @@ websearch_to_tsquery('english', ${$q.searchTerm})`,
      );
    }

    if (condition.length === 0) return undefined;

    return and(...condition);
  }
}
