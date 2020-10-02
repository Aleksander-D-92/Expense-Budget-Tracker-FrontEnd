import React, {MouseEvent} from "react";
import {TvShow} from "../../services/the_movie_db/TvShowsService";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {Card, CardHeader, CardMedia, CircularProgress, Grid, IconButton, Tooltip} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";
import AddIcon from "@material-ui/icons/Add";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";
import {
    CREATE_FAVORITE,
    CreateFavoriteResp,
    CreateFavoriteVars, DELETE_FAVORITE, DeleteFavoriteVars,
    FavoriteType
} from "../../services/apollo/mutations/FavoriteMutations";
import {useMutation} from "@apollo/client";
import {Dummy} from "../../services/apollo/ApoloConfig";
import {addFavoriteAction, deleteFavoriteAction} from "../../config/redux/Favorites";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
    tvShows?: TvShow[],
    initialStateLoading: boolean
}

function SmallTvShowCarousel(props: Props) {
    const history = useHistory();
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favoriteTV = useSelector((state: ReduxState) => state.favorites.filter(f => f.favoriteType === FavoriteType.TV));
    const dispatch = useDispatch();

    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE)
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/tv-shows/${e.currentTarget.id}`)
    }

    function addFavorite(e: MouseEvent) {
        createFavorite({
            variables: {
                userId: userId,
                movieDBId: parseInt(e.currentTarget.id),
                favoriteType: FavoriteType.TV
            }
        }).then((e) => {
            if (e.data === null || e.data === undefined) {
                return;
            }
            dispatch(addFavoriteAction(e.data.createFavorite));
        })
    }

    function removeFavorite(e: MouseEvent) {
        let currentTargetId = e.currentTarget.id;
        console.log(currentTargetId);
        // @ts-ignore
        const id = favoriteTV.find(f => f.movieDBId == parseInt(currentTargetId)).favoriteId;
        if (id === undefined) {
            return;
        }
        deleteFavorite({
            variables:
                {
                    favoriteId: id
                }
        }).then(() => {
            let fav = favoriteTV.find(f => f.favoriteId == id);
            if (fav !== undefined) {
                dispatch(deleteFavoriteAction(fav))
            }
        })
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
                                        <>
                                            {!(favoriteTV.filter(f => f.movieDBId == tvShow.id && f.favoriteType === FavoriteType.TV).length > 0) ?
                                                <>
                                                    <IconButton aria-label="settings"
                                                                style={{display: (deleteLoading || createLoading || props.initialStateLoading) ? 'none' : 'inline-flex'}}
                                                                onClick={addFavorite}
                                                                id={`${tvShow.id}`}>
                                                        <Tooltip title={"Click to Add to favorites"}
                                                                 placement={'top'}
                                                                 arrow={true}>
                                                            <AddIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <CircularProgress size={30}
                                                                      thickness={10}
                                                                      style={{display: (deleteLoading || createLoading || props.initialStateLoading) ? 'block' : 'none'}}/>
                                                </>
                                                :
                                                <>
                                                    <IconButton aria-label="settings"
                                                                id={`${tvShow.id}`}
                                                                style={{display: (deleteLoading || createLoading || props.initialStateLoading) ? 'none' : 'inline-flex'}}
                                                                onClick={(e: MouseEvent) => removeFavorite(e)}>
                                                        <Tooltip title={"Click to Remove from favorites"}
                                                                 placement={'top'}
                                                                 arrow={true}>
                                                            <CloseIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <CircularProgress size={30}
                                                                      thickness={10}
                                                                      style={{display: (deleteLoading || createLoading || props.initialStateLoading) ? 'block' : 'none'}}/>
                                                </>
                                            }
                                        </>
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
