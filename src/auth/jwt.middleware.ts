import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);

    if (token) {
      const decoded = this.jwtService.decode(token);
      req['isAdmin'] =
        decoded && typeof decoded === 'object' && decoded.user === 'mor_2314';
    }

    next();
  }
}
