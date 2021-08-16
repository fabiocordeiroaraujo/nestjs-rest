import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response.builder';
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {
        this.productService = productService;
    }

    @Post()
    public cria(@Body() product: Product): NestResponse {
        const productCreated = this.productService.criar(product);
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/product/${productCreated.id}`
            })
            .setBody(productCreated)
            .build();
    }

    @Get()
    public lista(): Product[] {
        const products = this.productService.listar();        
        return products;
    }

    @Get(':id')
    public recupera(@Param('id') id: number): Product {
        const product = this.productService.recuperar(id);
        if (!product) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Produto não encontrado'
            });
        }
        return product;
    }

    @Get(':codigo')
    public recuperaPorCodigo(@Param('codigo') codigo: string): Product {
        const product = this.productService.recuperarPorCodigo(codigo);
        if (!product) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Produto não encontrado'
            });
        }
        return product;
    }
}