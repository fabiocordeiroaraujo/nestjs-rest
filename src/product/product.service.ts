import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>) {
  }

  async criar(product: Product): Promise<Product> {
    product.dataCadastro = new Date();    
    let productCreated: Product = this.productsRepository.create(product);
    return this.productsRepository.save(productCreated)
  }

  async listar(): Promise<Product[]> {
    return this.productsRepository.find(); 
  }

  public async recuperar(id: number): Promise<Product> {
    let foundProduct: Product
    await this.recuperarRepo(id).then(resp => {
      foundProduct = resp;
    });  
    if (foundProduct != null) {
      return foundProduct
    } else {
      return null;
    }    
  }

  private async recuperarRepo(id: number): Promise<Product> {    
    return this.productsRepository.findOne(id);
  }

  public async recuperarPorCodigo(codigo: string): Promise<Product> {
    let foundProduct: Product; 
    await this.recuperarPorCodigoRepo(codigo).then(resp => {
      foundProduct = resp;
    });  
    if (foundProduct != null) {
      return foundProduct
    } else {
      return null;
    }     
  }

  private async recuperarPorCodigoRepo(codigo: string): Promise<Product> {    
    return this.productsRepository.findOne(codigo);
  }

  async apagar(id: number) {
    const user = await this.productsRepository.delete(id);
  }
}
