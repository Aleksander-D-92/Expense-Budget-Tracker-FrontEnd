import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {TVShowDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {MovieTvShowBackground} from "../shered/MovieTvShowBackground";
import {PageLoading} from "../shered/PageLoading";

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
            <PageLoading loading={tvShowDetails === undefined}/>
            <MovieTvShowBackground backdrop_path={tvShowDetails?.backdrop_path}
                                   poster_path={tvShowDetails?.poster_path}
                                   title={tvShowDetails?.name}
                                   genres={tvShowDetails?.genres}
                                   vote_average={tvShowDetails?.vote_average}/>
        </>
    )
}

export {TvShowDetailsController}
