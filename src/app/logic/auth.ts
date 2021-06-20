import Axios from "axios";
import { TOKEN_STORAGE } from ".";

export type registerType = {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    password: string;
};

export const getSavedToken = () => {
    return localStorage.getItem(TOKEN_STORAGE) ? localStorage.getItem(TOKEN_STORAGE) : null;
};

export const getMe = async () => {
    try {
        const resp = await Axios.get("/user");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getMyCourses = async () => {
    try {
        const resp = await Axios.get("/user/courses");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data: { email: string; password: string }) => {
    try {
        const resp = await Axios.post("/login", data);
        if (resp.data.login) {
            localStorage.setItem(TOKEN_STORAGE, resp.data.token);
        }
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (data: registerType) => {
    try {
        const resp = await Axios.post("/register", data);
        
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const resp = await Axios.post("/logout");
        if (resp.data.status === "success") {
            localStorage.removeItem(TOKEN_STORAGE);
        }
    } catch (error) {
        throw error;
    }
};
