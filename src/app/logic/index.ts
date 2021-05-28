import Axios from "axios";

export const TOKEN_STORAGE = "TOKEN_STORAGE";

Axios.defaults.baseURL = "https://api.komf.ir/api/";

Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_STORAGE);

    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

// const NodeAxios = Axios.create({baseURL:''})

export const fetcher = async (url: string) => {
    try {
        const resp = await Axios.get(url);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
