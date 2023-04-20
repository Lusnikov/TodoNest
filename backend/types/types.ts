import { Section } from "src/Entities/Section.entity";
import { Todo } from "src/Entities/Todo.entity";

export interface ClientUserData {
    avatarUrl: string,
    id: number,
    sections: Section[],
    todos:  Todo[], 
}

