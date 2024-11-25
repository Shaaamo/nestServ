import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './jwt.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Using a dummy secret key since fake.api doesn't provide one
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtMiddleware],
  exports: [JwtMiddleware, JwtModule],
})
export class AuthModule {}
