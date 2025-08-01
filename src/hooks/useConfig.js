import { useContext } from "react";
import ConfigContext from "../Contexts/ConfigContext";

const useConfig = () => useContext(ConfigContext)


export default useConfig;