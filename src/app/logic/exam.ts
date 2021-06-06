import { NodeAxios } from ".";

export type examType = {
    _id?: string;
    duration: {
        reading: number;
        writing: number;
        listening: number;
        speaking: number;
    };
    description: string;
};

export const getExams = async () => {
    try {
        const resp = await NodeAxios.get("/admin/exams");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createExam = async (data: examType) => {
    try {
        const resp = await NodeAxios.post("/admin/exams", data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateExam = async (id: string, data: examType) => {
    try {
        const resp = await NodeAxios.put(`/admin/exams/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteExam = async (id: string) => {
    try {
        const resp = await NodeAxios.delete(`/admin/exams/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
