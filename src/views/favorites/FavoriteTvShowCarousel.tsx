import React, {MouseEvent} from "react";
import {TVShowDetails} from "../../services/the_movie_db/TvShowsService";
import {Card, CardHeader, CardMedia, Grid, Tooltip, Typography} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {formatDate} from "../../shared/utils/functions";
import {NoFavorite} from "./NoFavorite";
import {useHistory} from "react-router-dom";

interface Props {
    tvShows?: TVShowDetails[]
}

function FavoriteTvShowCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    return (
        <>
            <Typography variant={'h3'} align={'center'} className={'mt-4'}>Favorite TV Shows</Typography>
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
            {(props.tvShows === undefined || props.tvShows.length <= 0) && <NoFavorite text={'No Favorite TV Shows'}/>}
        </>
    )
}

export {FavoriteTvShowCarousel}
