
import {
    axiosPublic,
} from "./axios"

class Server {
    constructor() {};

    async getData(endpoint="", params={}) {
        try {
            const { status, data } = await axiosPublic.get(endpoint, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async postData(endpoint="", _data={}, params={}) {
        try {
            const { status, data } = await axiosPublic.post(endpoint, _data, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async putData(endpoint="", _data={}, params={}) {
        try {
            const { status, data } = await axiosPublic.put(endpoint, _data, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async patchData(endpoint="", _id="", _data={}, params={}) {
        try {
            const { status, data } = await axiosPublic.patch(`${endpoint}/${_id}`, _data, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
}

export default new Server();