import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService){
        this.userService = userService;
    }

    @Post()
    public criar(@Body() usuario): any {
        return this.userService.criar(usuario);
    }

    @Get()
    public listar(): any[] {
        return this.userService.listar();
    }
}