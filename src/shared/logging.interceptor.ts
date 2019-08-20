import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    if (req) {
      const { method, url, user } = req;
      return next.handle().pipe(
        tap(() =>
          Logger.log(
            `method:${method}; url:${url}; user:${user &&
              user.username}; handler:${context.getHandler().name}; ${Date.now() - now}ms`,
            context.getClass().name
          )
        ),
        map(data => {
          Logger.log(data);
          return data;
        })
      );
    }
  }
}
