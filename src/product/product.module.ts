import { Module } from '@nestjs/common';
import { IsCodigoUniqueConstraint } from './validators/is-codigo-unique.validator';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, IsCodigoUniqueConstraint]
})
export class ProductModule {}


