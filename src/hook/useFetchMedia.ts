import { useState, useEffect, useCallback } from "react";
import { Media } from "../model/Media"

const useFetchAuthor = (id: number | undefined) => {
    const [media, setMedia] = useState<Media>()


    const fetchMedia = useCallback(async () => {
        if(id == 0){
            setMedia({id: 0, source_url: "https://www.ninetechno.com/a/images/2021/computer-word/default.png"})
            return 0;
        }
        const res = await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/media/"+id)
        const resJson = await res.json()
        setMedia(resJson)
    }, [id])

    
    useEffect(() => {
        fetchMedia()
    }, [fetchMedia])

    return { media }
}

export default useFetchAuthor