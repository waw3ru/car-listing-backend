import { carMakeSchema, carModelSchema, carSchema } from './database.schemas';

export const CarMakeSchemaType = typeof carMakeSchema.$inferSelect;
export const CarMakeInsertType = typeof carMakeSchema.$inferInsert;

export const CarModelSchemaType = typeof carModelSchema.$inferSelect;
export const CarModelInsertType = typeof carModelSchema.$inferInsert;

export const CarSchemaType = typeof carSchema.$inferSelect;
export const CarInsertType = typeof carSchema.$inferInsert;
