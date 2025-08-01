import { useContext } from "react";
import ErrorContext from "../Contexts/ErrorContext";

const useError = () => useContext(ErrorContext)


export default useError;