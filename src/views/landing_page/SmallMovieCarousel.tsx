import React, {MouseEvent} from "react";
import Carousel from "react-multi-carousel";
import {Movie} from "../../services/the_movie_db/MovieService";
import {Card, CardHeader, CardMedia, Grid, IconButton, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {formatDate} from "../../shared/utils/functions";
import './css/LadningPage.css'
import {useHistory} from 'react-router-dom';
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";

interface Props {
    movies?: Movie[],
}

function SmallMovieCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    return (
        <>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.movies !== undefined ? props.movies.map(movie => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 380}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={movie.title}
                                    subheader={`Release Date: ${formatDate(movie.release_date)}`}
                                    action={
                                        <IconButton aria-label="settings">
                                            <Tooltip title={"Click to add to favorites"}
                                                     placement={'top'}
                                                     arrow={true}>
                                                <AddIcon/>
                                            </Tooltip>
                                        </IconButton>
                                    }
                                />
                                <Tooltip title={"Double Click to see details"}
                                         placement={'top'}
                                         arrow={true}>
                                    <CardMedia className={'landingPageSmallImage'}
                                               id={`${movie.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 300}}
                                               image={imageBasePath + movie.backdrop_path}
                                    />
                                </Tooltip>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>

        </>
    )
}


export {SmallMovieCarousel}
