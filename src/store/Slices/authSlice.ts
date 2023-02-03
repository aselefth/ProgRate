import { createSlice } from "@reduxjs/toolkit"
import { IUser, IUserLogin } from "../../types/types"

export interface InitialState {
    token: string | null
    isLogged: boolean
}

const initialState: InitialState = {
    token: null,
    isLogged: false,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setCredentials: function (state, action) {
            state.token = action.payload.token
            state.isLogged = action.payload.isLogged
        },
        logOut: function (state) {
            state.token = null
            state.isLogged = false
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions
export default authSlice.reducer