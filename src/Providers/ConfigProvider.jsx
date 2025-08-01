
import ConfigContext from "../Contexts/ConfigContext";
import {
  useSelector, 
  useDispatch 
} from 'react-redux'

const ConfigProvider = ({ children }) => {
    const state = useSelector((state) => state.config);
    const dispatch = useDispatch();

    return (
        <ConfigContext.Provider value={{ 
                ...state, 
                dispatch,
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider;