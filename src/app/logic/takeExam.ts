import { NodeAxios } from ".";

export type answersType = {
    questionInstanceId: string;
    choices?: [string];
    file?: string;
    content?: string;
};

export const startExam = async (examId: string) => {
    try {
        const resp = await NodeAxios.post("/student/exam_instances/", { examId });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getExamQuestions = async () => {
    try {
        const resp = await NodeAxios.get("/student/question_instances/");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const postAnswers = async (data: answersType[]) => {
    try {
        const resp = await NodeAxios.post("/student/answers/", { answers: data });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
