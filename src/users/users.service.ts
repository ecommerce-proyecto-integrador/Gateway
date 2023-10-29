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
import { UpdateEquipoNameInput } from './dto/update-equipoName.input';
import { DeleteEquipoInput } from './dto/delete-equipo.input';
import { UpdatePasswordInput2 } from './dto/update2-userpass.input';
import { AgregarIntegrante } from './dto/agregar-integrante.input';


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
        console.error('Error al emitir el evento:', error);
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
    ////////////////////////////////////////////////////// USUARIOS  ///////////////////////////////////////////////////////
  
    
    /////////////////////////////////////////////////////// EQUIPOS  ///////////////////////////////////////////////////////

    
    async createEquipo(nombre: string, correo: string): Promise<boolean> {
      
      const token = await firstValueFrom(this.client.send('new_equipo_created',{nombre,correo}))
      
      console.log(token)
      return token;
    }

    async showInfoEquipo(correo: string): Promise<string> {
      
      
      const equipoInfo = await firstValueFrom(this.client.send('show_info_equipo',{correo}))
      
      
      return equipoInfo;
    }

    async updateEquipoName(updateEquipoNameInput: UpdateEquipoNameInput, correo: string): Promise<boolean> {
      const oldName = updateEquipoNameInput.antiguoNombreEquipo;
      const newName = updateEquipoNameInput.nuevoNombreEquipo;
    
     
      
      
      const token = await firstValueFrom(this.client.send('update_name_equipo',{oldName,newName,correo}))
      
      return token;
    }
    async deleteEquipo(deleteEquipoInput: DeleteEquipoInput, correo: string): Promise<boolean> {
      const name = deleteEquipoInput.name;
      
     
      
      
      const token = await firstValueFrom(this.client.send('delete_name_equipo',{name,correo}))
      
      return token;
    }
    async agregarIntegrante(agregarIntegranteInput: AgregarIntegrante, correo: string): Promise<boolean> {
      const nombreEquipo = agregarIntegranteInput.nombreEquipo
      const correoIntegrante = agregarIntegranteInput.correoIntegrante;
       
      
     
      
      
      const token = await firstValueFrom(this.client.send('agregar_integrante',{nombreEquipo,correoIntegrante,correo}))
      
      return token;
    }
    
    /////////////////////////////////////////////////////// Equipos  ///////////////////////////////////////////////////////
    



    
    


}
