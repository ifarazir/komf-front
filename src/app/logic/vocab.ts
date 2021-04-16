import Axios from 'axios';

export const getVocabs = async () => {
    try {
        const resp = await Axios.get('/vocabs');
        return resp.data;
    } catch (error) {
        throw error;
    }
}