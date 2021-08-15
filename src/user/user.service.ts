import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  private usuarios = [];

  public criar(usuario): any {
    this.usuarios.push(usuario);
    return usuario;
  }

  public listar(): any[] {
    return this.usuarios;
  }
}
