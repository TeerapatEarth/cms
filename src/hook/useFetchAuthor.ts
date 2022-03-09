import { useState, useEffect, useCallback } from "react";
import { Author } from "../model/Author";

const useFetchAuthor = (id: string | number |undefined) => {
    const [author, setAuthor] = useState<Author>()
    const [render, setRender] = useState(false)

    const fetchAuthor = useCallback( async () => {
        const res = await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/users/"+id)
        const resJson = await res.json()
        setAuthor(resJson)
        setRender(true)
    }, [id])

    useEffect(() => {
        fetchAuthor()
    }, [fetchAuthor])

    return { author, render }
}

export default useFetchAuthor