
import ThemeContext from "../Contexts/ThemeContext";
import {
  useSelector, 
  useDispatch 
} from 'react-redux'

const ConfigProvider = ({ children }) => {
    const state = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    return (
        <ThemeContext.Provider value={{ 
                ...state, 
                dispatch,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ConfigProvider;