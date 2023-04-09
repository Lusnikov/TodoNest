export interface UserInterface{
    id: number,
    name: string,
    avatarUrl: string,
    todos: Todos[],
    sections: Section[]
}

export interface Section {
  id: number,
  name: string,
}

export interface RefreshReturn  {
    accessToken: string,
    userData: {

    }
}

export type Todos = { 
  id: number,
  dateCreated: string,
  section?: Section,
  dateEnded?: string ,
  status: "ended" | "inProcess" | "success" ,
  title: string,
  content: string,
  completed: boolean
}

export type CreateTodoData  = Pick<Todos, 'title' | 'content' | 'dateEnded'>



export interface SetTodoData {
  sectionId: number,
  todoId: number,
  
}

export interface AddTodoPayload extends Pick<Todos, 'title' | 'content' | 'section' >{
  date?: Date,
  time?: string 
}