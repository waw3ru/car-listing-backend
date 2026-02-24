import { sql } from 'drizzle-orm';
import {
  check,
  index,
  numeric,
  pgEnum,
  pgTable,
  text,
} from 'drizzle-orm/pg-core';

// enums
const vipStatusEnum = pgEnum('vip_status', ['NON_VIP', 'VIP', 'VIP_PLUS']);
const purchaseStatusEnum = pgEnum('purchase_status', ['AVAILABLE', 'SOLD']);

// schema
export const carMakeSchema = pgTable('car_makes', {
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

export const carModelSchema = pgTable('car_models', {
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

export const carSchema = pgTable(
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
    vipStatus: vipStatusEnum('vip_status').default('NON_VIP'),
    purchaseStatus: purchaseStatusEnum('purchase_status').default('AVAILABLE'),
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
