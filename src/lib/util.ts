import { camelCase, isArray, isObject, mapKeys, mapValues } from 'lodash';
import { customAlphabet } from 'nanoid';

export const enableErrorReporting = () =>
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

export const isNil = (e: unknown) => e === null || e === undefined;

export const objectHasItems = (e: unknown) =>
  typeof e === 'object' && Object.keys(e as Record<string, unknown>).length > 0;

export const getUid = (count = 7) => {
  const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNPQRSTUVWXYZ', count);
  return nanoid();
};

export const totalPaginationPages = (totalCount: number, pageSize: number) => {
  if (totalCount < 1) return 1;
  const mod = totalCount % pageSize;
  let additionalPage = 0;
  if (mod > 0) additionalPage += 1;
  const pages = (totalCount - mod) / pageSize;
  return pages + additionalPage;
};

export const toCamelCase = (obj: unknown) => {
  if (isArray(obj)) return obj.map(toCamelCase);
  if (isObject(obj) && obj !== null) {
    const n = mapKeys(obj, (_v, k) => camelCase(k));
    return mapValues(n, toCamelCase);
  }
  return obj;
};
