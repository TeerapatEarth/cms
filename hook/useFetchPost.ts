import { useState, useEffect } from "react";

const useFetchPost = (url : string) => {
    const [posts, setPostDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
          .then((res) => res.json())
          .then((json) => setPostDetail(json))
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
    }, [url]);

    return { posts, loading, error, }
}

export default useFetchPost