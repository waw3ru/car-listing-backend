import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, map } from 'rxjs';
import { totalPaginationPages } from 'src/lib';

import type { PaginationQueryValidationType } from '../validations';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const $q = request.query as unknown as PaginationQueryValidationType;

    return next.handle().pipe(
      map((data) => {
        if ('output' in data && 'rowsCount' in data) {
          return {
            data: data.output,
            pagination: {
              currentPage: +$q.page,
              pageSize: +$q.pageSize,
              totalPages: totalPaginationPages(
                data.rowsCount as number,
                $q.pageSize,
              ),
              totalCount: data.rowsCount,
              sortKey: $q.sortKey || 'createdOn',
              searchTerm: $q.searchTerm,
            },
          };
        }
      }),
    );
  }
}
