
import ErrorContext from "../Contexts/ErrorContext";
import {
  useSelector, 
  useDispatch 
} from 'react-redux'

const ErrorProvider = ({ children }) => {
    const state = useSelector((state) => state.log);
    const dispatch = useDispatch();

    return (
        <ErrorContext.Provider value={{ 
                ...state, 
                dispatch,
            }}
        >
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider;