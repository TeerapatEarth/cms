import { useState, useEffect, useCallback } from "react";
import { Post } from "../model/Post";

const useFetchOnePost = (id : string | string[] | undefined) => {
    const [postDetail, setPostDetail] = useState<Post>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [renderPost, setRenderPost] = useState(false);

    const fetchOnePost = useCallback(async () => {
      setLoading(true)
      try{
        const res = await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/posts/" + id)
        const resJson = await res.json()
        setPostDetail(resJson)
      } catch (error : any){
        setError(error)
      }
      setLoading(false)
      setRenderPost(true)
    }, [id])

    useEffect(() => {
      fetchOnePost()
    }, [fetchOnePost]);

    return { postDetail, loading, error, renderPost }
}

export default useFetchOnePost