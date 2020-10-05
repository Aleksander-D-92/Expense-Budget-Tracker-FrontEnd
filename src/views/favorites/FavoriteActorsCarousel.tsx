import React, {MouseEvent} from "react";
import {ActorDetails} from "../../services/the_movie_db/ActorService";
import {Card, CardHeader, CardMedia, Grid, Tooltip, Typography} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {formatDate} from "../../shared/utils/functions";
import {NoFavorite} from "./NoFavorite";
import {useHistory} from "react-router-dom";

interface Props {
    actors: ActorDetails[]
}

function FavoriteActorsCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/actors/${e.currentTarget.id}`)
    }
    return (
        <>
            <Typography variant={'h3'} align={'center'} className={'mt-4'}>Favorite Actors</Typography>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.actors !== undefined ? props.actors.map(actor => {
                    return <Grid container={true} justify={'center'} key={actor.id}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{height: 565}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={actor.name}
                                    subheader={`Born: ${formatDate(actor.birthday)}`}
                                />
                                <Tooltip title={"Double Click to see details"}
                                         placement={'top'}
                                         arrow={true}>
                                    <CardMedia className={'landingPageSmallImage'}
                                               id={`${actor.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 480}}
                                               image={imageBasePath + actor.profile_path}
                                    />
                                </Tooltip>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
            {(props.actors === undefined || props.actors.length <= 0) && <NoFavorite text={'No Favorite Actors'}/>}
        </>
    )
}

export {FavoriteActorsCarousel};
