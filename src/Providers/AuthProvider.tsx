
import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import PrivateServer from "../helper/PrivateServer";
import { endpoints } from "../helper/endpoints";

const AuthProvider = ({ children }) => {
    const [values, setValues] = useState({
        isLoading: false,
        currentUser: "",
        currentUserEmail: "",
        currentUserId: "",
        profileId: "",
        permissions: []
    });
    
    useEffect(() => {
        const getPermissions = async () => {
            const { Profile } = endpoints;
            const response = await PrivateServer.getData(Profile.me);

            if(response?.data) setValues({ 
                ...values, 
                currentUser: response?.data?.username, 
                currentUserEmail: response?.data?.email, 
                permissions: response?.data?.permissions,
                profileId: response?.data?.profileId
            });
        }

        getPermissions();
    }, [])

    return (
        <AuthContext.Provider value={{ 
                values, 
                setValues,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;