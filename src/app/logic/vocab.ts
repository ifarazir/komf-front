import Axios from "axios";

export interface IBaseVocab {
    word: string;
    syn: string;
    def: string;
    ex1?: string;
    ex2?: string;
}

export interface IVocab extends IBaseVocab {
    id: number;
}

export const getVocabs = async () => {
    try {
        const resp = await Axios.get("/admin/vocabs");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createVocab = async (lessonnId:string, data:IBaseVocab) => {
    try {
        const resp = await Axios.post(`/api/admin/lessons/${lessonnId}/vocabs/add`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateVocab = async (id:number, data:IBaseVocab) => {
    try {
        const resp = await Axios.patch(`/admin/vocabs/${id}`, data);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteVocab = async (id:number) => {
    try {
        const resp = await Axios.delete(`/admin/vocabs/${id}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};