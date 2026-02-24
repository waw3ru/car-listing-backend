import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './.migrations',
  schema: ['./src/database/database.schema.ts'],
  dialect: 'sqlite',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DB_FILE!,
  },
  migrations: {
    table: '__nltd__migrations',
    prefix: 'timestamp',
    schema: 'public',
  },
});
