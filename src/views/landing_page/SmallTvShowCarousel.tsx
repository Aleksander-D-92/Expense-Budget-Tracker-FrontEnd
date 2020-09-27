import React, {MouseEvent} from "react";
import {TvShow} from "../../services/the_movie_db/TvShowsService";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {Card, CardHeader, CardMedia, Grid, IconButton, Tooltip} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";
import AddIcon from "@material-ui/icons/Add";

interface Props {
    tvShows?: TvShow[]
}

function SmallTvShowCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    function redirect(e: MouseEvent) {
        history.push(`/tv-shows/${e.currentTarget.id}`)
    }

    return (
        <>
            <Carousel responsive={responsive}>
                {props.tvShows !== undefined ? props.tvShows.map(tvShow => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 380}}>
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
                                <Tooltip title={"Double Click to see details"} placement={'top'} arrow={true}>
                                    <CardMedia className={'landingPageSmallImage'}
                                               id={`${tvShow.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 300}}
                                               image={imageBasePath + tvShow.backdrop_path}
                                    />
                                </Tooltip>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>;
        </>
    )
}

export {SmallTvShowCarousel}
