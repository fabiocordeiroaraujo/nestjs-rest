import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterHttpException } from './common/filtros/filter-http-exception.filter';
import { ResponseInterceptor } from './core/http/response.interceptors';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: FilterHttpException
    }
  ]  
})
export class AppModule {}
