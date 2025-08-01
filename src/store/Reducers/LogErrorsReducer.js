
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showToast: false,
    show: false,
    severity: 'error',
    variant: 'filled',
    message: 'Something went wrong!'
}

const LogErrorsReducer = createSlice({
    name: 'log',
    initialState,
    reducers: {
        show_alert: (state, { payload }) => {         
            return {
                ...state,
                show: payload?.show,
                severity: payload?.severity,
                variant: payload?.variant,
                message: payload?.message
            }
        },
        close_alert: (state, { payload }) => {            
            return {
                ...state,
                show: payload?.show,
                severity: "",
                message: ""
            }
        },
        show_toast: (state, { payload }) => {            
            return {
                ...state,
                showToast: true,
                severity: payload?.severity,
                variant: payload?.variant,
                message: payload?.message
            }
        },
        close_toast: (state, { payload }) => {
            return {
                ...state,
                showToast: payload?.showToast,
                severity: "",
                message: ""
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { show_alert, close_alert, show_toast, close_toast } = LogErrorsReducer.actions

export default LogErrorsReducer.reducer