import { carMakeSchema, carModelSchema, carSchema } from './database.schemas';

export type CarMakeSchemaType = typeof carMakeSchema.$inferSelect;
export type CarMakeInsertType = typeof carMakeSchema.$inferInsert;

export type CarModelSchemaType = typeof carModelSchema.$inferSelect;
export type CarModelInsertType = typeof carModelSchema.$inferInsert;

export type CarSchemaType = typeof carSchema.$inferSelect;
export type CarInsertType = typeof carSchema.$inferInsert;
