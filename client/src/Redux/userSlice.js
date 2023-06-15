import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    currentUser : null,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state,action) => {
            state.loading = false
            state.currentUser = action.payload
            console.log("Login Success")
        },
        loginFailure: (state) =>{
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = false
        }
    }
})

export const {loginStart, loginFailure, loginSuccess, logout} = userSlice.actions
export default userSlice.reducer