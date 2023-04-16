import { $api } from "@/pages/api/api"
import { UpdateTodoDateInput } from "@/types/types"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const updateTodoDate = createAsyncThunk<boolean, UpdateTodoDateInput>('users/setTodoDate', 
    async (input) => {
       const promise = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })
      return true
    }
)
