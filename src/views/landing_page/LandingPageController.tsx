import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {MovieCollection, MovieService} from "../../services/the_movie_db/MovieService";
import {ImageContainer} from "./ImageContainer";
import {PageLoading} from "./PageLoading";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        avatar: {
            fontSize: 30
        },
    }),
);

function LandingPageController() {
    const [topRated, setTopRated] = useState<MovieCollection>();
    useEffect(() => {
        MovieService.getTopRated(1).then((e) => {
            setTopRated(e.data);
        })
    }, []);
    return (
        <>
            <Grid container justify="center">
                <Grid xs={12} md={12}>
                    <PageLoading loading={topRated === undefined}/>
                    <Carousel autoPlay={true}>
                        {topRated?.results.map(movie => {
                            return <ImageContainer movie={movie}/>
                        })}
                    </Carousel>
                    {/*<SmallCarousel movies={topRated?.results}/>*/}
                </Grid>
            </Grid>
        </>
    )
}

export {LandingPageController}
