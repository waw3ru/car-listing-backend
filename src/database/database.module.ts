import { Global, Module } from '@nestjs/common';

import { db } from '../lib/orm';

export const DB = Symbol('nalima_db');

@Global()
@Module({
  providers: [
    {
      provide: DB,
      useFactory: () => db,
    },
  ],
  exports: [DB],
})
export class DatabaseModule {}
