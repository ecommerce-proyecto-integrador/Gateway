import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserInput } from './dto/login-user.input';
import { firstValueFrom } from 'rxjs';
import { UpdatePasswordInput } from './dto/update-userpass.input';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordInput2 } from './dto/update2-userpass.input';


@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy,@InjectRepository(Users) private usersRepository:Repository<Users>,private jwtService: JwtService){}
    findAll(): Promise<Users[]>{
        return this.usersRepository.find()
    }
    
    ////////////////////////////////////////////////////// USUARIOS  ///////////////////////////////////////////////////////
    async createUser(user: CreateUserInput): Promise<boolean> {
      try {
        const resp = await firstValueFrom(this.client.send('new_user_created', user))
        return resp; 
      } catch (error) {
        console.error('Error al emitir el evento1:', error);
        return false; 
      }
    }
   
    async updatePassUser(updatePasswordInput: UpdatePasswordInput, correo: string): Promise<boolean> {
      
      const oldpass = updatePasswordInput.claveAntigua;
      const newpass = updatePasswordInput.claveNueva;
     
      
      
      const token = await firstValueFrom(this.client.send('update_pass_user',{oldpass,newpass,correo}))
      
      return token;
    }
   
    async loginUserTest(user: LoginUserInput): Promise<string | null> {
      try {
        // Llama al microservicio para obtener el token JWT
        const token = await firstValueFrom(
          this.client.send<string, LoginUserInput>('login_user', user),
        );
        console.log(token);
    
        return token; // Retorna el token JWT del microservicio o null si la autenticación falla
      } catch (error) {
        console.error('Error en la llamada a loginUserTest:', error);
        return "";
      }
    }
    async showInfo(correo: string): Promise<string> {
      
      //const correoToken = await firstValueFrom(this.client.send('show_info_user',{correo}))
      const userInfo = await firstValueFrom(this.client.send('show_info_user',{correo}))
      
      
      return userInfo;
    }
    
    async recovery(correo: string): Promise<string> {
      
      //const correoToken = await firstValueFrom(this.client.send('show_info_user',{correo}))
      const code = await firstValueFrom(this.client.send('return_code_user',{correo}))
      
      
      return code;
    }

    async confirmCode(correo: string, code: string): Promise<string> {
      
      //const correoToken = await firstValueFrom(this.client.send('show_info_user',{correo}))
      
      const resp = await firstValueFrom(this.client.send('confirm_pass_user',{correo,code}))
      
      return resp;
    }
    async updatePassUser2(UpdatePasswordInput2: UpdatePasswordInput2): Promise<boolean> {
      
      
      const newpass = UpdatePasswordInput2.claveNueva;
      const correo = UpdatePasswordInput2.correo;
      
      
      const token = await firstValueFrom(this.client.send('update_pass_user2',{newpass,correo}))
      
      return token;
    }
    

    
    
    



    
    


}
