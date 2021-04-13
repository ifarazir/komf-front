import Axios from "axios";

export type courseRequest = {
    title: string;
    description: string;
    price: number;
};

export type courseType = {
    title: string;
    description: string;
    price: number;
    id: number;
};

export const getCourses = async () => {
    try {
        const resp = await Axios.get("/courses");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createCourse = async (data: courseRequest) => {
    try {
        const resp = await Axios.post("/admin/courses", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateCourse = async (id:number, data: courseRequest) => {
    try {
        const resp = await Axios.put(`/admin/courses/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCourses = async (id:number) => {
    try {
        const resp = await Axios.delete(`/admin/courses/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};