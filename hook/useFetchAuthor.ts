import { useState, useEffect } from "react";
import { Author } from "../model/Author";

const useFetchAuthor = (id: number | undefined) => {
    const [author, setAuthor] = useState<Author>()
    useEffect(() => {
        fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/users/"+id)
        .then((res) => res.json())
        .then((json) => setAuthor(json))
    }, [id])

    return { author }
}

export default useFetchAuthor