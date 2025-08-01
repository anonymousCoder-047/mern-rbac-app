
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    token: "",
}

const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            return {
                ...state, ...payload
            }
        },
        logout: (state) => {
            return { ...state, email: "", token: "" }
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = AuthReducer.actions

export default AuthReducer.reducer