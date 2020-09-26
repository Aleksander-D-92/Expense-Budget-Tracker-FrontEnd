import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import {Grid, Typography} from "@material-ui/core";
import {MovieCollection, MovieService} from "../../services/the_movie_db/MovieService";
import {ImageContainer} from "./ImageContainer";
import {PageLoading} from "./PageLoading";

function LandingPageController() {
    const [topRated, setTopRated] = useState<MovieCollection>();
    useEffect(() => {
        MovieService.getTopRated(1).then((e) => {
            setTopRated(e.data);
        })
    }, []);
    return (
        <>
            <Grid container={true} justify="center">
                <Grid item={true} xs={12} md={12}>
                    <PageLoading loading={topRated === undefined}/>
                    <ImageContainer movies={topRated?.results}/>
                </Grid>
            </Grid>
        </>
    )
}

export {LandingPageController}
