import { NodeAxios } from ".";

export type sections = "reading" | "listening" | "speaking" | "writing";

export type questionType = {
    _id?: string;
    examId: string;
    questionParentId: string | null;
    content: string;
    questionNumber: string | null;
    file?: string;
    section: sections | null;
    type: "body" | "singleChoice" | "multiChoice" | "ordering";
    part: null | 1 | 2 | 3 | 4;
    options: { A: string; B: string; C: string; D: string; E?: string } | null;
    answer: [string] | [any] | null;
    subQuestions?: questionType[];
};

export const getExamQuestions = async (examId: string, section: sections) => {
    try {
        const resp = await NodeAxios.get("/admin/questions", { params: { examId, section } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createExamQuestion = async (data: questionType) => {
    try {
        const resp = await NodeAxios.post("/admin/questions", data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateExamQuestion = async (id: string, data: questionType) => {
    try {
        const resp = await NodeAxios.put(`/admin/questions/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteExamQuestion = async (id: string) => {
    try {
        const resp = await NodeAxios.delete(`/admin/questions/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
