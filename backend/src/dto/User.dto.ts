import { Section } from "src/Entities/Section.entity";
import { Todo } from "src/Entities/Todo.entity";
import { User } from "src/Entities/UserEntity";
import { ClientUserData } from "types/types";
export class UserDto implements User  {
    userId: number;
    activationStatus: Boolean;
    avatarUrl?: string;
    email: string;
    todos: Todo[];
    sections: Section[];
    password: string;
    refreshToken: string;

    constructor(user: User){
        this.userId= user.userId;
        this.activationStatus = user.activationStatus
        this.avatarUrl = user.avatarUrl
        this.activationStatus = user.activationStatus
        this.email = user.email
        this.todos = user.todos
        this.sections = user.sections
        this.password = user.password
        this.refreshToken = user.refreshToken
    }

    toClientDto():ClientUserData{
        return {
           avatarUrl: this.avatarUrl ,
            id: this.userId,
           sections: this.sections,
           todos: this.todos,
        }
    }


}