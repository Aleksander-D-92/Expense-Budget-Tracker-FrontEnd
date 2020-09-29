import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {
    ActorDetails,
    ActorMovieOrTvCreditsResponse,
    ActorService
} from "../../services/the_movie_db/ActorService";

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
            div {actorId}
        </>
    )
}

export {ActorDetailsController}
