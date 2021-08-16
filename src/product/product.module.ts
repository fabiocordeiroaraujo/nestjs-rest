import { Module } from '@nestjs/common';
import { IsCodigoUniqueConstraint } from './validators/is-codigo-unique.validator';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, IsCodigoUniqueConstraint],
  exports: [TypeOrmModule]
})
export class ProductModule {}


