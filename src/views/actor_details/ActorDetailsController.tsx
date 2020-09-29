import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {ActorDetails, ActorMovieOrTvCreditsResponse, ActorService} from "../../services/the_movie_db/ActorService";
import {PageLoading} from "../shered/PageLoading";
import {ActorBackground} from "./ActorBackground";
import {Grid, Typography} from "@material-ui/core";
import {ActorDescription} from "./ActorDescription";
import {ActorMovieTvShowCarousel} from "./ActorMovieTvShowCarousel";
import ScrollAnimation from "react-animate-on-scroll";

function ActorDetailsController() {
    const {actorId} = useParams();
    const [actorDetails, setActorDetails] = useState<ActorDetails>();
    const [actorMovieCredits, setActorMovieCredits] = useState<ActorMovieOrTvCreditsResponse>();
    const [actorTvCredits, setActorTvCredits] = useState<ActorMovieOrTvCreditsResponse>();
    useEffect(() => {
        ActorService.getDetails(actorId).then((e) => {
            setActorDetails(e.data);
        });
        ActorService.getActorMovieCredits(actorId).then((e) => {
            setActorMovieCredits(e.data);
        });
        ActorService.getActorTvCredits(actorId).then((e) => {
            setActorTvCredits(e.data);
        });
    }, [actorId])
    return (
        <>
            <PageLoading
                loading={actorDetails === undefined || actorTvCredits === undefined || actorMovieCredits === undefined}
            />
            <Grid container={true} justify={'center'} spacing={1}>
                <Grid item={true} xs={12} md={6}>
                    <ScrollAnimation animateIn={'fadeInLeft'}>
                        <ActorBackground actorDetails={actorDetails}/>
                    </ScrollAnimation>
                </Grid>
                <Grid item={true} xs={12} md={6}>

                    <ScrollAnimation animateIn={'fadeInRight'}>
                        <Typography align={'center'} variant={'h4'} className={'mt-2'}>
                            Movies know for
                        </Typography>
                        <ActorMovieTvShowCarousel tvOrMovie={actorMovieCredits?.cast}/>
                        <Typography align={'center'} variant={'h4'} className={'mt-2'}>
                            Tv Shows known for
                        </Typography>
                        <ActorMovieTvShowCarousel tvOrMovie={actorTvCredits?.cast}/>
                    </ScrollAnimation>


                </Grid>
                <Grid item={true} xs={12} md={11}>
                    <ScrollAnimation animateIn={'fadeInUp'}>
                        <ActorDescription actorDetails={actorDetails}/>
                    </ScrollAnimation>
                </Grid>
            </Grid>
        </>
    )
}

export {ActorDetailsController}
