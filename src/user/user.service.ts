import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>) {
  }

  async criar(user: User): Promise<User> {
    user.dataCadastro = new Date();    
    let userCreated: User = this.usersRepository.create(user);
    return this.usersRepository.save(userCreated)
  }

  // public atualizar(user: User): [number, User[]] {
  //   let qtd: number;
  //   let updateds: User[] =  this.usersRepository.update({ where: { id: user.id }})
  //   return [qtd, updateds];
  // }

  async listar(): Promise<User[]> {
    return this.usersRepository.find(); 
  }

  public async recuperar(id: number): Promise<User> {
    let foundUser: User
    await this.recuperarRepo(id).then(resp => {
      foundUser = resp;
    });  
    if (foundUser != null) {
      return foundUser
    } else {
      return null;
    }    
  }

  private async recuperarRepo(id: number): Promise<User> {    
    return this.usersRepository.findOne(id);
  }

  public async recuperarPorEmail(email: string): Promise<User> {
    let foundUser: User; 
    await this.recuperarPorEmailRepo(email).then(resp => {
      foundUser = resp;
    });  
    if (foundUser != null) {
      return foundUser
    } else {
      return null;
    }     
  }

  private async recuperarPorEmailRepo(email: string): Promise<User> {    
    return this.usersRepository.findOne(email);
  }

  async apagar(id: number) {
    const user = await this.usersRepository.delete(id);
  }
}
