import { useState, useEffect } from "react";
import { Tags } from "../model/Tags"
const useFetchOneTag = (id: string | undefined) => {
    const [tag, setTags] = useState<Tags>();
    useEffect(() => {
        fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/tags/" + id)
        .then((res) => res.json())
        .then((json) => setTags(json))
    }, [id]);
    return { tag }
}

export default useFetchOneTag