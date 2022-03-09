import { useState, useEffect, useCallback } from "react";

const useFetchPost = (url : string) => {
    const [posts, setPostDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPost = useCallback(async() => {
        setLoading(true)
        try{
            const res = await fetch(url)
            const resJson = await res.json()
            setPostDetail(resJson)
        } catch (error : any){
            setError(error)
        }
        setLoading(false)
    }, [url])

    useEffect(() => {
        fetchPost()
    }, [fetchPost]);

    return { posts, loading, error, }
}

export default useFetchPost