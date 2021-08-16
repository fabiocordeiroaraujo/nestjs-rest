import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response.builder';
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
        this.userService = userService;
    }

    @Post()
    public cria(@Body() user: User): NestResponse {
        const userCreated = this.userService.criar(user);
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/users/${userCreated.id}`
            })
            .setBody(userCreated)
            .build();
    }

    @Get()
    public lista(): User[] {
        const users = this.userService.listar();        
        return users;
    }

    @Get(':id')
    public recupera(@Param('id') id: number): User {
        const user = this.userService.recuperar(id);
        if (!user) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado'
            });
        }
        return user;
    }

    @Get(':email')
    public recuperaPorEmail(@Param('email') email: string): User {
        const user = this.userService.recuperarPorEmail(email);
        if (!user) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado'
            });
        }
        return user;
    }
}