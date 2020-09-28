import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {TVShowDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";

function TvShowDetailsController() {
    const {tvShowId} = useParams();
    const [tvShowDetails, setTvShowDetails] = useState<TVShowDetails>();
    useEffect(() => {
        TvShowsService.getDetails(tvShowId).then((e) => {
            setTvShowDetails(e.data);
            console.log(e.data);
        })
    }, [tvShowId])
    return (
        <>
            div
        </>
    )
}

export {TvShowDetailsController}
