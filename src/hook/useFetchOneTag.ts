import { useState, useEffect, useCallback } from "react";
import { Tags } from "../model/Tags"
const useFetchOneTag = (id: string | undefined) => {
    const [tag, setTag] = useState<Tags>();

    const fetchOneTag = useCallback(async () => {
        const res = await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/tags/" + id)
        const resJson = await res.json()
        setTag(resJson)
    }, [id])

    useEffect(() => {
        fetchOneTag()
    }, [fetchOneTag]);
    return { tag }
}

export default useFetchOneTag