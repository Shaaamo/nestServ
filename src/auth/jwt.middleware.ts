import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);

    if (token) {
      try {
        // Since we don't have the original secret key from fake.api,
        // we'll decode the token without verification
        const decoded = this.jwtService.decode(token);
        console.log('Decoded token:', decoded);
        
        if (decoded && typeof decoded === 'object') {
          // Check if the user is mor_2314 (admin user)
          req['user'] = decoded;
          req['isAdmin'] = decoded.user === 'mor_2314';
          console.log('Is admin?', req['isAdmin']);
        } else {
          console.log('Invalid token structure');
          req['user'] = null;
          req['isAdmin'] = false;
        }
      } catch (error) {
        console.error('Token processing failed:', error.message);
        req['user'] = null;
        req['isAdmin'] = false;
      }
    } else {
      console.log('No token provided');
      req['user'] = null;
      req['isAdmin'] = false;
    }

    next();
  }
}
