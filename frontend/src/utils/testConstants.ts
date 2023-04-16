import { Section, Todos } from "@/types/types";

export const mockTodos: Todos[] = [
    {
      content: 'О мой бог',
      dateCreated: new Date(),
      id: 299,
      dateEnded: new Date('Fri Apr 16 2023 15:30:00 GMT+0300 (Москва, стандартное время)'),
      title: 'Я давид',
      completed:false,
      
    },
    {
      content: 'О нет',
      dateCreated: new Date(),
      id: 291899,
      dateEnded: new Date('Fri Apr 16 2023 15:30:00 GMT+0300 (Москва, стандартное время)'),
      title: 'О нет',
      completed:false,
      
    },
    {
      content: 'Задачи',
      dateCreated: new Date(),
      id: 2929,
      dateEnded: new Date('Fri Apr 16 2023 15:30:00 GMT+0300 (Москва, стандартное время)'),
      title: 'Привет бейби',
      completed:false,
      
    },
    {
      content: 'Туду для дома',
      dateCreated: new Date(),
      dateEnded: new Date(),
      id: 499,

      title: 'f',
      section: {id:1, name:"Дом"},
      completed:false,
    },
    {
      content: 'Туду для дома 2',
      id: 4949,
      dateCreated: new Date(),
      title: 'f',
      section: {id:1, name:"Дом"},
      completed:false,
    
    },
    {
      content: 'Туду для дома',
      dateCreated: new Date(),
      id: 41399,
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