import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectEntityManager, InjectRepository,  } from '@nestjs/typeorm';
import { User } from 'src/Entities/UserEntity';
import { UserActivation } from 'src/Entities/UserActivation.entity';
import { EntityManager, Repository, Transaction } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

const SAULT = 10

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
                // Отправка email
                console.log(1)
                await this.emailService.sendEmailWithTransaction(manage, {
                    message: activation.activationLink,
                    subject: 'Авторизация',
                    to: 'lika_208@mail.ru'
                })

                
            } catch(err){ throw new BadRequestException(err, 'sdf') }

        })

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
        return await bcrypt.hash(userId.toString(), saltRounds); // вычисляем хэш с солью от идентификатора пользователя
       
      }
    
}

