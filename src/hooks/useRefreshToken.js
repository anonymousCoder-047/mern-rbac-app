
import { axiosPublic } from '../helper/axios';
import { endpoints } from '../Server/endpoints';

const useRefreshToken = () => {
    const { Auth } = endpoints;

    const refresh = async () => {
        try {
            const { data } = await axiosPublic.post(Auth['refresh-token'], {
                withCredentials: true
            });

            return data?.data;
        } catch(error) {
            console.log("error == ", error)
        }
    }

    return refresh;
};

export default useRefreshToken;