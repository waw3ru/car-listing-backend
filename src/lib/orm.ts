import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

import * as schema from '../database/database.schemas';

const db = drizzle(new Database(process.env.DB_FILE), {
  schema,
});

export { db };
