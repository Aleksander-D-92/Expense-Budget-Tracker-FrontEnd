import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {TVShowDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {MovieTvShowBackground} from "../shered/MovieTvShowBackground";
import {PageLoading} from "../shered/PageLoading";
import {Credits} from "../../services/the_movie_db/MovieService";
import {CastCarousel} from "../shered/CastCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {Typography} from "@material-ui/core";
import {SeasonCarousel} from "./SeasonCarousel";

function TvShowDetailsController() {
    const {tvShowId} = useParams();
    const [tvShowDetails, setTvShowDetails] = useState<TVShowDetails>();
    const [tvShowCredits, setTvShowCredits] = useState<Credits>();
    useEffect(() => {
        TvShowsService.getDetails(tvShowId).then((e) => {
            setTvShowDetails(e.data);
        });
        TvShowsService.getCredits(tvShowId).then((e) => {
            setTvShowCredits(e.data);
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
            <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                Cast
            </Typography>
            <ScrollAnimation animateIn={'fadeInLeft'}>
                <SeasonCarousel/>
            </ScrollAnimation>
            <ScrollAnimation animateIn={'fadeInRight'}>
                <CastCarousel cast={tvShowCredits?.cast}/>
            </ScrollAnimation>

        </>
    )
}

export {TvShowDetailsController}