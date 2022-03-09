import { useState, useEffect, useCallback } from "react";
const useFetchTag = (id: number | undefined) => {
    const [tag, setTags] = useState([]);

    const fetchTag = useCallback(async () => {
        const res = await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/tags?post=" + id)
        const resJson = await res.json()
        setTags(resJson)
    }, [id])

    useEffect(() => {
        fetchTag()
    }, [fetchTag]);
    return { tag }
}

export default useFetchTag