import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {ActorDetails, ActorMovieOrTvCreditsResponse, ActorService} from "../../services/the_movie_db/ActorService";
import {PageLoading} from "../shered/PageLoading";
import {ActorBackground} from "./ActorBackground";
import {Grid} from "@material-ui/core";
import {ActorDescription} from "./ActorDescription";

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
            <Grid container={true} justify={'center'}>
                <Grid item={true} xs={12} md={6}>
                    <ActorBackground actorDetails={actorDetails}/>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                    <ActorDescription actorDetails={actorDetails}/>
                </Grid>
            </Grid>
        </>
    )
}

export {ActorDetailsController}
