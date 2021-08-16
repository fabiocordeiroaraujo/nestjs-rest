import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { IsCodigoUnique } from "./validators/is-codigo-unique.validator";

export class Product {
    id: number;
    
    @IsString({ message: 'Nome inválido!' })
    @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })    
    nome: string;
        
    @IsCodigoUnique({ message:  'Esse código já foi cadastrado.' })
    @IsNotEmpty()
    codigo: string;
    
    @IsNotEmpty({ message: 'O preço é obrigatório.' })
    preco: number;

    @Expose({ name: 'cadastro' })
    dataCadastro: Date;
}