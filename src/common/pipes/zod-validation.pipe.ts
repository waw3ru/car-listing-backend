import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { objectHasItems } from 'src/lib';
import type { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(
    private schema: ZodType<T>,
    private message?: string,
    private validationType?: string,
  ) {
    this.message = this.message ?? 'Data provided is invalid';
  }

  transform(value: unknown, _m: ArgumentMetadata) {
    const $v = value as Record<string, unknown>;
    value = {
      ...$v,
      page: +($v.page as string),
      pageSize: +($v.pageSize as string),
    };

    const data = this.schema.safeParse(value);

    if (!data.success || !objectHasItems(data.data)) {
      console.log(data);
      throw new BadRequestException(this.message, {
        cause: data.error?.issues.map(({ message, path }) => ({
          key: path[0],
          issue: message,
        })),
      });
    }

    return data.data;
  }
}
