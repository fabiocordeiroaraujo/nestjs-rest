import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

  private products = [];

  public criar(product: Product): Product {
    product.id = this.products.length+1;
    product.dataCadastro = new Date();
    this.products.push(product);
    return product;
  }

  public listar(): Product[] {
    return this.products;
  }

  public recuperar(id: number): Product {
    const foundProduct = this.products.find(u => u.id == id);
    if (foundProduct != null) {
      return foundProduct
    } else {
      return null;
    }    
  }

  public recuperarPorCodigo(codigo: string): Product {
    const foundProduct = this.products.find(u => u.codigo == codigo);
    if (foundProduct != null) {
      return foundProduct
    } else {
      return null;
    }    
  }
}
