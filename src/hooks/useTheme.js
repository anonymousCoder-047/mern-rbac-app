import { useContext } from "react";
import ThemeContext from "../Contexts/ThemeContext";

const useTheme = () => useContext(ThemeContext)


export default useTheme;