import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/jwt.middleware';

@Module({
  imports: [CitiesModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
