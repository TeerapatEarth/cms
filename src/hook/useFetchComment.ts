import { useState, useEffect, useCallback } from "react";
import { Comment } from "../model/Comment";

const useFetchComment = (id: number | undefined) => {
    const [comment, setComments] = useState<Comment[]>([])

    const fetchComments = useCallback(async () => {
        const res = await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/comments/?post="+id)
        const resJson = await res.json()
        const sortArrComments = resJson.reverse()
        setComments(sortArrComments)
    }, [id])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    return { comment }
}

export default useFetchComment