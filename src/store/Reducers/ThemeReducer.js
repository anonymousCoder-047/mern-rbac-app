
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggleMiniSidebar: false,
    toggleSidebar: false,
    showMiniSidebar: false,
    lightMode: true,
    darkModde: false,
}

const ThemeReducer = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        set_theme_data: (state, { payload }) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            
            return {
                ...state, ...payload
            }
        },
        set_theme_by_key: (state, { payload }) => {
            const { key, value } = payload;

            return { ...state, [key]: value }
        },
    },
});

// Action creators are generated for each case reducer function
export const { set_theme_data, set_theme_by_key } = ThemeReducer.actions

export default ThemeReducer.reducer