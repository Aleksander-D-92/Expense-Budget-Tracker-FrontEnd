import React, {MouseEvent} from "react";
import {ActorMovieOrTvCredits} from "../../services/the_movie_db/ActorService";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {ACTOR_DETAILS_CAROUSEL} from "../../shared/utils/variables";
import {Card, CardContent, CardHeader, CardMedia, Grid, Tooltip, Typography} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";
import {LinkToDetails} from "../shered/LinkToDetails";
import {MediaType} from "../../services/the_movie_db/MultiSearchService";

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

    function playingAs(val: string): string {
        let arr = val.split(' / ');
        if (arr.length <= 1) {
            return val;
        } else {
            return `${arr[0]}, ${arr[1]} and others...`
        }
    }

    return (
        <>
            <Carousel responsive={ACTOR_DETAILS_CAROUSEL}>
                {props.tvOrMovie !== undefined ? props.tvOrMovie.filter(show => show.backdrop_path !== null).map(show => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-5 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 480, minHeight: 480}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={(show.title === undefined) ?
                                        <LinkToDetails mediaType={MediaType.tv}
                                                       value={show.name}
                                                       id={show.id}/>
                                        :
                                        <LinkToDetails mediaType={MediaType.movie}
                                                       value={show.title}
                                                       id={show.id}/>}
                                    subheader={`Release Date: ${(show.release_date !== undefined) ? formatDate(show.release_date) : formatDate(show.first_air_date)}`}
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
                                    <Typography variant={'subtitle1'} color={'textSecondary'}>
                                        Playing as : {playingAs(show.character)}
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
