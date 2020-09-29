import React, {MouseEvent} from "react";
import {ActorMovieOrTvCredits} from "../../services/the_movie_db/ActorService";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {ACTOR_DETAILS_CAROUSEL} from "../../shared/utils/variables";
import {Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Tooltip, Typography} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";
import AddIcon from "@material-ui/icons/Add";

interface Props {
    tvOrMovie?: ActorMovieOrTvCredits[]
}

function ActorMovieTvShowCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        if (props.tvOrMovie?.[0].first_air_date === undefined) {
            history.push(`/movies/${e.currentTarget.id}`)
        } else {
            history.push(`/tv-shows/${e.currentTarget.id}`)
        }
    }

    return (
        <>
            <Carousel responsive={ACTOR_DETAILS_CAROUSEL}>
                {props.tvOrMovie !== undefined ? props.tvOrMovie.filter(show => show.backdrop_path !== null).map(show => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 450}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={(show.title === undefined) ? show.name : show.title}
                                    subheader={`Release Date: ${(show.release_date !== undefined) ? formatDate(show.release_date) : formatDate(show.first_air_date)}`}
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
                                               id={`${show.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 300}}
                                               image={imageBasePath + show.backdrop_path}
                                    />
                                </Tooltip>
                                <CardContent>
                                    <Typography variant={'h6'}>
                                        Playing as : {show.character}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
        </>
    )
}

export {ActorMovieTvShowCarousel}
