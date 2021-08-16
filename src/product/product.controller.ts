import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
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
    async cria(@Body() product: Product): Promise<NestResponse> {
        let productCreated: Product;
        await this.productService.criar(product).then(resp => {
            productCreated = resp;            
        });          
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/product/${productCreated.id}`
            })
            .setBody(productCreated)
            .build();
    }

    @Get()
    async lista(): Promise<Product[]> {     
        return this.productService.listar();
    }

    @Get(':id')
    async recupera(@Param('id') id: number): Promise<Product> {
        let product: Product; 
        await this.productService.recuperar(id).then(resp => {
            product = resp;            
        });          
        if (!product) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Produto não encontrado'
            });
        }
        return product;
    }

    @Get(':codigo')
    async recuperaPorCodigo(@Param('codigo') codigo: string): Promise<Product> {
        let product: Product; 
        await this.productService.recuperarPorCodigo(codigo).then(resp => {
            product = resp;            
        });          
        if (!product) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Produto não encontrado'
            });
        }
        return product;
    }

    @Delete(':id')
    public async apaga(@Param('id') id: number): Promise<NestResponse> {        
        await this.productService.apagar(id);          
        return new NestResponseBuilder()
            .setStatus(HttpStatus.OK)            
            .setBody({"id": id})
            .build();
    }
}