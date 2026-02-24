import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { DBException, OperationException } from 'src/lib';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof DBException) {
          return throwError(
            () =>
              new InternalServerErrorException(err.message, {
                cause: err.cause,
              })
          );
        }

        if (err instanceof OperationException) {
          return throwError(
            () => new NotAcceptableException(err.toString(), { cause: err })
          );
        }

        return throwError(() => err);
      })
    );
  }
}
