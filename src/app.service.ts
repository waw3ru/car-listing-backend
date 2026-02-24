import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  healthcheck() {
    return {
      health: 'OK',
      timestamp: new Date(),
    };
  }
}
