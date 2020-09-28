import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {MovieCredits, MovieDetails, MovieService} from "../../services/the_movie_db/MovieService";
import {CastCarousel} from "./CastCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {Typography} from "@material-ui/core";
import {MovieDescription} from "./MovieDescription";
import {MovieBackground} from "./MovieBackground";
import './css/MovieDetails.css'
import {PageLoading} from "../landing_page/PageLoading";


function MovieDetailsController() {
    const {movieId} = useParams();
    const [movieCredits, setMovieCredits] = useState<MovieCredits>();
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    useEffect(() => {
        MovieService.getDetails(movieId).then((e) => {
            setMovieDetails(e.data);
            console.log(e.data);
        });
        MovieService.getCredits(movieId).then((e) => {
            setMovieCredits(e.data);
        });
    }, [movieId]);
    return (
        <>
            <PageLoading loading={movieCredits === undefined || movieDetails === undefined}/>
            <MovieBackground movieDetails={movieDetails}/>
            <ScrollAnimation animateIn={'fadeInUp'}>
                <MovieDescription movieDetails={movieDetails}/>
            </ScrollAnimation>
            <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                Cast
            </Typography>
            <ScrollAnimation animateIn={'fadeInLeft'}>
                <CastCarousel cast={movieCredits?.cast}/>
            </ScrollAnimation>
        </>
    )
}

export {MovieDetailsController}
