import { useState, useEffect } from "react";
const useFetchTag = (id: number | undefined) => {
    const [tag, setTags] = useState([]);
    useEffect(() => {
        fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/tags?post=" + id)
        .then((res) => res.json())
        .then((json) => setTags(json))
    }, [id]);
    return { tag }
}

export default useFetchTag