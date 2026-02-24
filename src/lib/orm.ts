import { SQL } from 'bun';
import { drizzle as drizzleBunSQL } from 'drizzle-orm/bun-sql';

import * as schemas from '../database/database.schemas';

const db = drizzleBunSQL({
  client: new SQL(process.env.DB!),
  schema: schemas,
});

export { db };
