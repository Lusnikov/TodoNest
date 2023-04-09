import { Section, Todos } from "@/types/types";

export const mockTodos: Todos[] = [
    {
      content: 'Я планировал многое сделать',
      dateCreated: '',
      id: 299,
      status: 'ended',
      title: 'f',
      completed:false,
      
    },
    {
      content: 'Туду для дома',
      dateCreated: '',
      id: 499,
      status: 'ended',
      title: 'f',
      section: {id:1, name:"Дом"},
      completed:false,
    },
    {
      content: 'Туду для дома 2',
      dateCreated: '',
      id: 4949,
      status: 'ended',
      title: 'f',
      section: {id:1, name:"Дом"},
      completed:false,
    
    },
    {
      content: 'Туду для дома',
      dateCreated: '',
      id: 41399,
      status: 'ended',
      title: 'Поиграться с семьей',
      section: {
        id: 3,
        name: 'Семья'
      },
      completed:false,
    }

 ]

export const mockSecions:Section[]=  [
  {id:1, name:"Дом"},
  {
    id: 3,
    name: 'Семья'
  }
  
  // {id:}
]