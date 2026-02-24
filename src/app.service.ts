import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { BunSQLDatabase } from 'drizzle-orm/bun-sql';
import { and } from 'node_modules/drizzle-orm/sql/expressions/index.cjs';
import { PaginationQueryValidationType } from './common/validations';
import { DB } from './database/database.module';
import * as schemas from './database/database.schemas';

@Injectable()
export class AppService {
  constructor(@Inject(DB) private db: BunSQLDatabase<typeof schemas>) {}

  async query($q: PaginationQueryValidationType) {
    let q = this.db
      .select()
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

  createCarMake(carData: any) {
    return this.db.insert(schemas.carMakeSchema).values(carData);
  }

  createCarModel(carData: any) {
    return this.db.insert(schemas.carModelSchema).values(carData);
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
