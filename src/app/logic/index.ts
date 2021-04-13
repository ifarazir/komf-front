import Axios from 'axios'

export const TOKEN_STORAGE = 'TOKEN_STORAGE';

Axios.defaults.baseURL = 'https://api.komf.ir/api/';

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_STORAGE);
    
    if(token){
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
})