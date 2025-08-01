
import AuthContext from "../Contexts/AuthContext";
import {
  useSelector, 
  useDispatch 
} from 'react-redux'

const AuthProvider = ({ children }) => {
    const state = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <AuthContext.Provider value={{ 
                ...state, 
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;