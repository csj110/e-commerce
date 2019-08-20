import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SellerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.seller) {
      throw new HttpException('Unauthorizated access', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
