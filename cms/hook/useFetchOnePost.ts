import { useState, useEffect } from "react";
import { Post } from "../model/Post";

const useFetchOnePost = (id : string | string[] | undefined) => {
    const [postDetail, setPostDetail] = useState<Post>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [renderPost, setRenderPost] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/posts/" + id)
          .then((res) => res.json())
          .then((json) => setPostDetail(json))
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
        setRenderPost(true);
    }, [id]);

    return { postDetail, loading, error, renderPost }
}

export default useFetchOnePost