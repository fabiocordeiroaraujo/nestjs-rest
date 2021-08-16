import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService){
        this.userService = userService;
    }

    @Post()
    public cria(@Body() usuario: User): User {
        return this.userService.criar(usuario);
    }

    @Get()
    public lista(): User[] {
        return this.userService.listar();
    }

    @Get(':id')
    public recupera(@Param('id') id: number): User {
        return this.userService.recuperar(id);
    }

    @Get(':email')
    public recuperaPorEmail(@Param('email') email: string): User {
        return this.userService.recuperarPorEmail(email);
    }
}