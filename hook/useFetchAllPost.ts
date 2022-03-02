import { useState, useEffect } from "react";
import { Post } from "../model/Post";

const useFetchAllPost = () => {
    const [posts, setPostDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/posts/")
          .then((res) => res.json())
          .then((json) => setPostDetail(json))
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
    }, []);

    return { posts, loading, error, }
}

export default useFetchAllPost