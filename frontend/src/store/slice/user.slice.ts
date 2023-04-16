import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { $api } from '@/pages/api/api'
import { AddTodoPayload, RefreshReturn, Section, SetTodoData, Todos, UserInterface } from '@/types/types'
import { mockSecions, mockTodos } from '@/utils/testConstants'
import { updateTodoDate } from '../async/async'


// Отвечает за обновление refresh-токена и возврат информации о пользователе в случае его валидности
export const refresh = createAsyncThunk('users/refresh', 
    async () => {
      const {data} = await $api.post<RefreshReturn>('/refresh')
      return data
    }
)

export const createGroup = createAsyncThunk<Section, string>(
  'group/create',
  async (groupName) => {
    const promise = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    })
    return  {
      name: groupName,
      id: Math.floor(Math.random() * 9991) + 10
    }
  }
)

export const setTodoGroup = createAsyncThunk<Todos, SetTodoData>('todos/setGroup',
  async (d) => {
    const promise = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    })
    return  {
      content: 'Туду для дома',
      dateCreated: new Date(),
      id: d.todoId,
      status: 'ended',
      title: 'Поиграться с семьей',
      section: {
        id: d.sectionId,
        name: ',fdsl[fs'
      },
      completed:false,
    }
  }
)

export const completeTodo = createAsyncThunk('todos/complete',
    async (arrayId: number[]) => {
      const promise = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })
      return arrayId
    }
)

export const addTodo = createAsyncThunk<Todos, AddTodoPayload>('users/getUser', 
    async (e) => {
      console.error(e)
      const promise = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })


      return   {
        content: e.content,
        dateCreated:   new Date(),
        id: Math.floor(Math.random() * 9991) + 10,
        status: 'ended',
        title: e.title,
        section: e.section ?? undefined,
        completed:false,
        
      }
    }
)

export const removeTodo = createAsyncThunk('todos/removeTodo', 
    async (idArray: number[]) => {
      // const {data} = await $api.post<RefreshReturn>('todos/removeTodo', {id})
      const promise = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })
      console.warn('Якобы удалено')
      return idArray
    }
)


// const initialState: UserInterface | null = {
//   avatarUrl: '',
//   id: 1,
//   name: '1',
//   sections: mockSecions,
//   todos:  mockTodos,

// } as UserInterface | null

const initialState: UserInterface | null = null as UserInterface | null

export const userSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      if (!state) return 
      const deletedId = action.payload
      state.todos = [...state.todos].filter(todo =>  !deletedId.includes(todo.id ))
    })
    
    builder.addCase(completeTodo.fulfilled, (state, action) => {
      if (!state) return 
      const completedId = action.payload
      state.todos = state.todos.map(todo => {
        if ( completedId.includes(todo.id)) return {
          ...todo,
          completed: true
        }
        return todo
      })
    })

    builder.addCase(createGroup.fulfilled, (state, action) => {
      if (!state) return
      const {payload} = action
      state.sections = [...state.sections, payload]
     })

     builder.addCase(setTodoGroup.fulfilled, (state, {payload}) => {
      if (!state) return
      // console.warn(action.payload)
      state.todos = [...state.todos.filter(elem => elem.id !== payload.id ), payload]
     })

     builder.addCase(addTodo.fulfilled, (state, {payload}) => {
      if (!state) return
      state.todos = [payload,...state.todos]
     })

     builder.addCase(updateTodoDate.pending, (state, action) =>{
        if (!state) return
        const {meta: {arg}} = action
        state.todos = state.todos.map(e => {
          if (e.id === arg.todoId){
            return {
              ...e,
              dateEnded: arg.date,
            }
          }
          return e
        })
     })
  
  }
})


export default userSlice.reducer