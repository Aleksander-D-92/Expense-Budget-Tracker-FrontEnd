import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {MovieCredits, MovieDetails, MovieService} from "../../services/the_movie_db/MovieService";


function MovieDetailsController() {
    const {movieId} = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const [movieCredits, setMovieCredits] = useState<MovieCredits>();
    useEffect(() => {
        MovieService.getDetails(movieId).then((e) => {
            setMovieDetails(e.data);
            console.log(e.data);
        });
        MovieService.getCredits(movieId).then((e) => {
            setMovieCredits(e.data);
            console.log(e.data);
        });
    }, [movieId]);
    return (
        <>
            div
        </>
    )
}

export {MovieDetailsController}
