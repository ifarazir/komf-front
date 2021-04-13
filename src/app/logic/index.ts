import Axios from 'axios'

export const TOKEN_STORAGE = 'TOKEN_STORAGE';

Axios.defaults.baseURL = 'api/';

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_STORAGE);
    // config.headers.Accept = 'application/json';
    if(token){
        config.headers.Authoriztion = 'Bearer ' + token;
    }
    return config;
})