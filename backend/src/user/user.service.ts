import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectEntityManager, InjectRepository,  } from '@nestjs/typeorm';
import { User } from 'src/Entities/UserEntity';
import { UserActivation } from 'src/Entities/UserActivation.entity';
import { EntityManager, Repository, Transaction } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { ClientUserData } from 'types/types';

export const SAULT = 10

// USER { 
// }
type T = Partial<User>

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserActivation)
        private UserActivationRepos: Repository<UserActivation>,
        private emailService: EmailService
    ){}

    async createUser(email: string, password: string){
        const userExists = await this.userRepository.findOneBy({
            email
        })

        if (userExists){
            throw new HttpException(
                'Пользователь с email-уже занят',
                HttpStatus.CONFLICT
            )
        }

        await this.userRepository.manager.transaction(async (manage) => {
            try{
               const {user, activation}= await this.createUserAndActivation(email, password, manage)
                await this.emailService.sendEmailWithTransaction(manage, {
                    message: process.env.CURRENT_URL+'/auth/activate/'+activation.activationLink,
                    subject: 'Авторизация',
                    to: 'lika_208@mail.ru'
                })

                
            } catch(err){ throw new BadRequestException(err, 'sdf') }

        })

    }

    async updateUserModel(model:User){
        return await this.userRepository.save(model)
    }

    async getUserByLink(activationLink: string){
        const link = await  this.UserActivationRepos.findOne({where: {
            activationLink
        }})        
        if (!link)  throw new HttpException('Ссылки не найдено', 400)
        return {
            user: link.user
        }
    }

    async clearActivationLink(user: User){
        await this.UserActivationRepos.delete({user: {userId: user.userId}})
    }

    // {}
    async getUserBy<T extends keyof User>(field:  T, value: User[T]){
        const user = await this.userRepository.findOne({
            where:{
                [field]: value
            }
        
        })

        if (!user) throw new NotFoundException()
        return user
    }



    async  saveTokenIdDatabase(user: User, token: string){
        user.refreshToken = token
        this.userRepository.save(user)
        console.log('save in db', user)
    }

    private async createUserAndActivation(email: string, password: string, manage: EntityManager){
        const user = new User()
        user.email = email
        user.password = await bcrypt.hash(password, SAULT)
        await manage.save(user)
        const activation = new UserActivation()
        activation.activationLink = await this.generateUniqueLink(user.userId)
        activation.user = user
        await manage.save(activation)
        return {user, activation}
    }

    private async  generateUniqueLink(userId: number) {
        const saltRounds = 10;
        const res = await bcrypt.hash(userId.toString(), saltRounds); // вычисляем хэш с солью от идентификатора пользователя
        return res.replace(/[\W_]/g, "");
       
      }

    
    
}

