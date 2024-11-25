import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './jwt.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'No-Key-blayt',
      signOptions: { expiresIn: '11h' },
    }),
  ],
  providers: [JwtMiddleware],
  exports: [JwtMiddleware, JwtModule],
})
export class AuthModule {}
