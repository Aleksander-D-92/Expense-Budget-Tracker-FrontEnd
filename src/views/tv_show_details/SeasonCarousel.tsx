import React from "react";
import {Season} from "../../services/the_movie_db/TvShowsService";
import Carousel from "react-multi-carousel";
import {Card, CardContent, CardHeader, CardMedia, Grid, Tooltip, Typography} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {formatDate} from "../../shared/utils/functions";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";

interface Props {
    seasons?: Season[]
}

function SeasonCarousel(props: Props) {
    const imageBasePath = 'https://image.tmdb.org/t/p/h632';
    return (
        <>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.seasons !== undefined ? props.seasons.map(season => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-5 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 520, minHeight: 520}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={season.name}
                                />
                                <Tooltip title={"Double Click to see details"}>
                                    {season.poster_path !== null ? <CardMedia className={'landingPageSmallImage'}
                                                                              id={`${season.id}`}
                                                                              style={{height: 380}}
                                                                              image={imageBasePath + season.poster_path}
                                        /> :
                                        <>
                                            <Typography variant={'h5'} align={'center'}>
                                                Not out yet <br/> <HighlightOffIcon fontSize={'large'}/>
                                            </Typography>
                                        </>
                                    }
                                </Tooltip>
                                <CardContent>
                                    <Typography variant={'subtitle1'} align={'left'}>
                                        Air
                                        Date: {(season.air_date === null) ? 'To Be Decided' : formatDate(season.air_date)}
                                    </Typography>
                                    <Typography variant={'subtitle1'} align={'left'}>
                                        Number of Episodes: {season.episode_count}
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

export {SeasonCarousel}
