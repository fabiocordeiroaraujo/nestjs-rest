import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsCodigoUnique } from "./validators/is-codigo-unique.validator";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString({ message: 'Nome inválido!' })
    @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })    
    @Column({ nullable: false, length: 120 })
    nome: string;
        
    // @IsCodigoUnique({ message:  'Esse código já foi cadastrado.' })
    @IsNotEmpty()
    @Column({ nullable: false, length: 60,  unique: true })
    codigo: string;
    
    @IsNotEmpty({ message: 'O preço é obrigatório.' })
    @Column({ nullable: false })
    preco: number;

    @Expose({ name: 'cadastro' })
    @CreateDateColumn({ nullable: false })
    dataCadastro: Date;
}