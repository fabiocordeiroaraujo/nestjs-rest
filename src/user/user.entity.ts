import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.enum";
import { IsEmailUnique } from "./validators/is-email-unique.validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString({ message: 'Nome inválido!' })
    @IsNotEmpty({ message: 'O nome do usuário é obrigatório.' })    
    @Column({ nullable: false, length: 120 })
    nome: string;
    
    @IsEmail({}, { message: 'Email inválido!' })    
    // @IsEmailUnique({ message:  'Esse email já foi cadastrado.' })
    @IsNotEmpty()
    @Column({ nullable: false, length: 60,  unique: true })
    email: string;

    // toPlainOnly -> Apenas na serealização para enviar na rede
    @Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @Column({ nullable: false, length: 60 })
    senha: string;

    @Expose({ name: 'cadastro' })
    @CreateDateColumn({ nullable: false })
    dataCadastro: Date;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role: UserRole
}