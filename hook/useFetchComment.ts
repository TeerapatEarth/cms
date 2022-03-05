import { useState, useEffect } from "react";
import { Comment } from "../model/Comment";

const useFetchComment = (id: number | undefined) => {
    const [comment, setComments] = useState<Comment[]>([])

    useEffect(() => {
        fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/comments/?post="+id)
        .then((res) => res.json())
        .then((json) => setComments(json))
    }, [id])

    return { comment }
}

export default useFetchComment