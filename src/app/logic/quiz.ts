import Axios from "axios";

export interface IQuizQuestion {
    id?: string;
    title: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    answer: string;
    lesson_id: string;
}

export const getQuizQuestions = async () => {
    try {
        const resp = await Axios.get("/admin/quiz/questions");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createQuizQuesion = async (data:IQuizQuestion) => {
    try {
        const resp = await Axios.post('/admin/quiz/questions', data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateQuizQuestion = async (id:string, data:IQuizQuestion) => {
    try {
        const resp = await Axios.put(`/admin/quiz/questions${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const deleteQuizQuestion = async (id:string) => {
    try {
        const resp = await Axios.delete(`/admin/quiz/questions/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};