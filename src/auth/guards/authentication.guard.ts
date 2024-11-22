import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // Mark the function as async since it uses await
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      const decoded = this.jwtService.decode(token) as {
        email?: string;
        password?: string;
      };

      if (!decoded || !decoded.email || !decoded.password) {
        throw new UnauthorizedException('Invalid token structure');
      }

      if (!decoded.password) {
        throw new UnauthorizedException('Invalid password');
      }
      // If the validation succeeds, allow the request to proceed
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
