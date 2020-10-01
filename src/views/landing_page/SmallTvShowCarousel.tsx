import React, {MouseEvent} from "react";
import {TvShow} from "../../services/the_movie_db/TvShowsService";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {Card, CardHeader, CardMedia, Grid, IconButton, Tooltip} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";
import AddIcon from "@material-ui/icons/Add";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";

interface Props {
    tvShows?: TvShow[]
}

function SmallTvShowCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/tv-shows/${e.currentTarget.id}`)
    }
    return (
        <>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.tvShows !== undefined ? props.tvShows.map(tvShow => {
                    return <Grid container={true} justify={'center'} key={tvShow.id}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{height: 565}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={tvShow.name}
                                    subheader={`Release Date: ${formatDate(tvShow.first_air_date)}`}
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
                                               id={`${tvShow.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 480}}
                                               image={imageBasePath + tvShow.backdrop_path}
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

export {SmallTvShowCarousel}
