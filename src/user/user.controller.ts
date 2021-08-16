import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
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
    async cria(@Body() user: User): Promise<NestResponse> {
        let userCreated: User;
        await this.userService.criar(user).then(resp => {
            userCreated = resp;            
        });          
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/users/${userCreated.id}`
            })
            .setBody(userCreated)
            .build();
    }

    @Get()
    async lista(): Promise<User[]> {     
        return this.userService.listar();
    }

    @Get(':id')
    async recupera(@Param('id') id: number): Promise<User> {
        let user: User; 
        await this.userService.recuperar(id).then(resp => {
            user = resp;            
        });          
        if (!user) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado'
            });
        }
        return user;
    }

    @Get(':email')
    async recuperaPorEmail(@Param('email') email: string): Promise<User> {
        let user: User; 
        await this.userService.recuperarPorEmail(email).then(resp => {
            user = resp;            
        });          
        if (!user) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado'
            });
        }
        return user;
    }

    @Delete(':id')
    public async apaga(@Param('id') id: number): Promise<NestResponse> {        
        await this.userService.apagar(id);          
        return new NestResponseBuilder()
            .setStatus(HttpStatus.OK)            
            .setBody({"id": id})
            .build();
    }
}