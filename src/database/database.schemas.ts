import { sql } from 'drizzle-orm';
import {
  check,
  index,
  numeric,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

// schema
export const carMakeSchema = sqliteTable('car_makes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(),
  imageUrl: text('image_url').notNull(),
  createdOn: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedOn: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const carModelSchema = sqliteTable('car_models', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(),
  createdOn: text('created_on').default(sql`(CURRENT_TIMESTAMP)`),
  updatedOn: text('updated_on')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  carMake: text('car_make')
    .references(() => carMakeSchema.id, { onDelete: 'restrict' })
    .notNull(),
});

export const carSchema = sqliteTable(
  'cars',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('title').notNull().unique(),
    yearOfManufacture: numeric('year_of_manufacture').notNull(),
    minPrice: numeric('min_price').notNull(),
    color: text('color').notNull(),
    imageUrl: text('image_url').notNull(),
    vipStatus: text('vip_status').notNull().default('NON_VIP'),
    createdOn: text('created_on').default(sql`(CURRENT_TIMESTAMP)`),
    updatedOn: text('updated_on')
      .default(sql`(CURRENT_TIMESTAMP)`)
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
    carMake: text('car_make')
      .references(() => carMakeSchema.id, { onDelete: 'restrict' })
      .notNull(),
    carModel: text('car_model')
      .references(() => carModelSchema.id, { onDelete: 'restrict' })
      .notNull(),
  },
  (table) => [
    check('car_min_price_check_size', sql`${table.minPrice} > 0`),
    index('car_created_on_idx').on(table.createdOn),
  ],
);
