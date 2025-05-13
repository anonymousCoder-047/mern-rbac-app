
import {
    axiosPrivate,
} from "./axios"

class PrivateServer {
    constructor() {};

    async getData(endpoint="", params={}) {
        try {
            const { status, data } = await axiosPrivate.get(endpoint, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async postData(endpoint="", _data={}, params={}) {
        try {
            const { status, data } = await axiosPrivate.post(endpoint, _data, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async putData(endpoint="", _data={}, params={}) {
        try {
            const { status, data } = await axiosPrivate.put(endpoint, _data, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async patchData(endpoint="", _id="", _data={}, params={}) {
        try {
            const { status, data } = await axiosPrivate.patch(`${endpoint}/${_id}`, _data, params);
        
            if(status == 200) return data;
        } catch(error) {
            throw error;
        }
    }
    
    async deleteData(endpoint="", _id="", params={}) {
        try {
            const { status } = await axiosPrivate.post(endpoint, { id: _id }, params);
        
            if(status == 200) return status;
        } catch(error) {
            throw error;
        }
    }
}

export default new PrivateServer();