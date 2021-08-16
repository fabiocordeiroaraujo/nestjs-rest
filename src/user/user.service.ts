import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
@Injectable()
export class UserService {

  private usuarios = [];

  public criar(usuario: User): User {
    usuario.id = this.usuarios.length+1;
    usuario.dataCadastro = new Date();
    this.usuarios.push(usuario);
    return usuario;
  }

  public listar(): User[] {
    return this.usuarios;
  }

  public recuperar(id: number): User {
    const foundUser = this.usuarios.find(u => u.id == id);
    if (foundUser != null) {
      return foundUser
    } else {
      return null;
    }    
  }

  public recuperarPorEmail(email: string): User {
    const foundUser = this.usuarios.find(u => u.email == email);
    if (foundUser != null) {
      return foundUser
    } else {
      return null;
    }    
  }
}
