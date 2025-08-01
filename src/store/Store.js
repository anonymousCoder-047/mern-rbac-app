
import { configureStore } from '@reduxjs/toolkit'

// import reducers
import AppConfigReducer from "./Reducers/AppConfigReducer"
import AuthReducer from "./Reducers/AuthReducer"
import ThemeReducer from "./Reducers/ThemeReducer"
import LogErrorsReducer from "./Reducers/LogErrorsReducer"

export default configureStore({
    reducer: {
        config: AppConfigReducer,
        auth: AuthReducer,
        theme: ThemeReducer,
        log: LogErrorsReducer
    },
})