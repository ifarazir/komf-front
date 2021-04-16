import {useState, useEffect} from 'react';

export function useQuery<ObjectType>(getData:() => Promise<any>) {
    const [data, setData] = useState<ObjectType[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const refreshData = async () => {
        try {
            setLoading(true);
            const resp = await getData();
            if (resp.status === "success") {
                setData(resp.data);
            } else {
                setError(resp.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return {data, refreshData, loading, error};
}