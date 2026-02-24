import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';

import { BasicAuthGuard } from './guards/basic-auth.guard';

@Module({
  imports: [PassportModule, CommonModule],
  providers: [BasicAuthGuard],
  exports: [BasicAuthGuard],
  controllers: [],
})
export class AuthModule {}
