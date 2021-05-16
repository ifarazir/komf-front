import Axios from "axios";

export type lessonRequest = {
    title: string;
    course_id: number;
};

export type lessonType = {
    id: number;
    title: string;
    course_id: string;
};

export const getLessons = async () => {
    try {
        const resp = await Axios.get("/admin/lessons");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getLessonVobacs = async (lessonId:string | number) => {
    try {
        const resp = await Axios.get(`/lessons/${lessonId}/vocabs`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const createLesson = async (data: lessonRequest) => {
    try {
        const resp = await Axios.post("/admin/lessons", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateLesson = async (id: number, data: lessonRequest) => {
    try {
        const resp = await Axios.put(`/admin/lessons/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteLessons = async (id: number) => {
    try {
        const resp = await Axios.delete(`/admin/lessons/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
