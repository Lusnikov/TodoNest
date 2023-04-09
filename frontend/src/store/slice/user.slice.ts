import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { $api } from '@/pages/api/api'
import { RefreshReturn, Section, SetTodoData, Todos, UserInterface } from '@/types/types'
import { mockTodos } from '@/utils/testConstants'


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
      dateCreated: '',
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

export const addTodo = createAsyncThunk('users/getUser', 
    async () => {
      const {data} = await $api.post<RefreshReturn>('/users/getUser')
      return data
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


const initialState: UserInterface | null = {
  avatarUrl: '',
  id: 1,
  name: '1',
  sections: [],
  todos:  mockTodos,

} as UserInterface | null

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
  
  }
})


export default userSlice.reducer