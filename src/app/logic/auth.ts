import Axios from 'axios';

export const login = async (data:any) => {
    try {
        const resp = await Axios.post('/login', data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const signUp = async (data:any) => {
    try {
        const resp = await Axios.post('/register', data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}