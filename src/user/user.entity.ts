import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsEmailUnique } from "./validators/is-email-unique.validator";

export class User {
    id: number;
    
    @IsString({ message: 'Nome inválido!' })
    @IsNotEmpty({ message: 'O nome do usuário é obrigatório.' })    
    nome: string;
    
    @IsEmail({}, { message: 'Email inválido!' })
    @IsEmailUnique({ message:  'Esse email já foi cadastrado.' })
    @IsNotEmpty()
    email: string;

    // toPlainOnly -> Apenas na serealização para enviar na rede
    @Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    senha: string;

    @Expose({ name: 'cadastro' })
    dataCadastro: Date;
}