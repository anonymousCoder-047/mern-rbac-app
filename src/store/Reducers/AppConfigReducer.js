
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    patient_required: false,
    encounter_required: false,
    profile: "",
    permissions: {},
    group: "",
    currentUsername: "",
    currentUserEmail: "",
    currentUserRole: "",
    currentUserClearance: 1,
    onboarding: "",
}

const AppConfigReducer = createSlice({
    name: 'config',
    initialState,
    reducers: {
        set_config: (state, { payload }) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            
            return {
                ...state, ...payload
            }
        },
        set_config_by_key: (state, { payload }) => {
            const { key, value } = payload;

            return { ...state, [key]: value }
        },
        showLoading: (state) => ({ ...state, isLoading: true }),
        hideLoading: (state) => ({ ...state, isLoading: false }),
    },
});

// Action creators are generated for each case reducer function
export const { set_config, set_config_by_key, showLoading, hideLoading } = AppConfigReducer.actions

export default AppConfigReducer.reducer