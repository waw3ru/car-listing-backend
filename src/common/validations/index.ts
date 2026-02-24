import { z } from 'zod';

export const paginationQueryValidation = z.object({
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  pageSize: z.number().max(50, 'Pagination size is too large').default(20),
  sortKey: z.string().default('createdOn'),
  searchTerm: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  model: z.string().optional(),
  make: z.string().optional(),
  year: z.number().optional(),
});
export type PaginationQueryValidationType = z.infer<
  typeof paginationQueryValidation
>;

export const createCarMakeValidation = z.object({
  name: z.string(),
  imageUrl: z.url(),
});
export type CreateCarMakeValidationType = z.infer<
  typeof createCarMakeValidation
>;

export const createCarModelValidation = z.object({
  name: z.string(),
  carMake: z.uuid(),
});
export type CreateCarModelValidationType = z.infer<
  typeof createCarModelValidation
>;

export const updateCarMakeValidation = z.object({
  name: z.string().optional(),
  imageUrl: z.url().optional(),
});
export type UpdateCarMakeValidationType = z.infer<
  typeof updateCarMakeValidation
>;

export const updateCarModelValidation = z.object({
  name: z.string().optional(),
});
export type UpdateCarModelValidationType = z.infer<
  typeof updateCarModelValidation
>;

export const createCarValidation = z.object({
  name: z.string(),
  carMake: z.uuid(),
  carModel: z.uuid(),
  yearOfManufacture: z.number().min(1900).max(2023),
  color: z.string(),
  imageUrl: z.url(),
  minPrice: z.number().min(0),
  vipStatus: z.enum(['VIP', 'NON_VIP', 'VIP_PLUS']),
  purchaseStatus: z.enum(['AVAILABLE', 'SOLD']),
});
export type CreateCarValidationType = z.infer<typeof createCarValidation>;

export const updateCarValidation = z.object({
  name: z.string().optional(),
  carMake: z.uuid().optional(),
  carModel: z.uuid().optional(),
  yearOfManufacture: z.number().min(1900).max(2023).optional(),
  color: z.string().optional(),
  imageUrl: z.url().optional(),
  minPrice: z.number().min(0).optional(),
  vipStatus: z.enum(['VIP', 'NON_VIP', 'VIP_PLUS']).optional(),
  purchaseStatus: z.enum(['AVAILABLE', 'SOLD']).optional(),
});
export type UpdateCarValidationType = z.infer<typeof updateCarValidation>;
