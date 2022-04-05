import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAll(state, { payload:{ users } }){
      if(users)
        return users
      return state
    }
  }
})

const { setAll } = usersSlice.actions

export const loadAll = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setAll({ users }))
  }
}


export default usersSlice.reducer