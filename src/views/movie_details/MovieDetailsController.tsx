import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {MovieDetails, MovieService} from "../../services/the_movie_db/MovieService";


function MovieDetailsController() {
    const [movieDetails, setMovieDetails] = useState<MovieDetails>()
    const {movieId} = useParams();
    useEffect(() => {
        MovieService.getDetails(movieId).then((e) => {
            setMovieDetails(e.data);
        })
    }, [])
    return (
        <>
            div
        </>
    )
}

export {MovieDetailsController}
