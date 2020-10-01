import React from "react";
import {Season} from "../../services/the_movie_db/TvShowsService";
import Carousel from "react-multi-carousel";
import {Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {formatDate} from "../../shared/utils/functions";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {EpisodesList} from "./EpisodesList";

interface Props {
    seasons?: Season[],
    tvShowId?: number
}

function SeasonCarousel(props: Props) {
    const imageBasePath = 'https://image.tmdb.org/t/p/w500';
    return (
        <>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.seasons !== undefined ? props.seasons.map(season => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-5 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 600, minHeight: 600}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={season.name}
                                    subheader={`Air Date: ${(season.air_date === null) ? 'To Be Decided' : formatDate(season.air_date)}`}
                                />
                                {season.poster_path !== null ? <CardMedia 
                                                                          id={`${season.id}`}
                                                                          style={{height: 450}}
                                                                          image={imageBasePath + season.poster_path}
                                    /> :
                                    <>
                                        <Typography variant={'h5'} align={'center'}>
                                            No image available <br/> <HighlightOffIcon fontSize={'large'}/>
                                        </Typography>
                                    </>
                                }
                                <CardContent>
                                    {/*modal prompt*/}
                                    <EpisodesList seasonNumber={season.season_number} tvShowId={props.tvShowId}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
        </>
    )
}

export {SeasonCarousel}
