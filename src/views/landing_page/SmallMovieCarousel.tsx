import React, {MouseEvent} from "react";
import CloseIcon from '@material-ui/icons/Close';
import Carousel from "react-multi-carousel";
import {Movie} from "../../services/the_movie_db/MovieService";
import {Card, CardHeader, CardMedia, CircularProgress, Grid, IconButton, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {formatDate} from "../../shared/utils/functions";
import './css/LadningPage.css'
import {useHistory} from 'react-router-dom';
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {useMutation} from "@apollo/client";
import {
    CREATE_FAVORITE,
    CreateFavoriteResp,
    CreateFavoriteVars,
    DELETE_FAVORITE,
    DeleteFavoriteVars,
    FavoriteType
} from "../../services/apollo/mutations/FavoriteMutations";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";
import {addFavoriteAction, deleteFavoriteAction} from "../../config/redux/Favorites";
import {Dummy} from "../../services/apollo/ApoloConfig";

interface Props {
    movies?: Movie[],
    initialStateLoading: boolean
}

function SmallMovieCarousel(props: Props) {
    const history = useHistory();
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favoriteMovies = useSelector((state: ReduxState) => state.favorites.filter(f => f.favoriteType === FavoriteType.MOVIE));
    const dispatch = useDispatch();

    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE)
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    function addFavorite(e: MouseEvent) {
        createFavorite({
            variables: {
                userId: userId,
                movieDBId: parseInt(e.currentTarget.id),
                favoriteType: FavoriteType.MOVIE
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
        const id = favoriteMovies.find(f => f.movieDBId == parseInt(currentTargetId)).favoriteId;
        if (id === undefined) {
            return;
        }
        deleteFavorite({
            variables:
                {
                    favoriteId: id
                }
        }).then(() => {
            let fav = favoriteMovies.find(f => f.favoriteId == id);
            if (fav !== undefined) {
                dispatch(deleteFavoriteAction(fav))
            }
        })
    }

    return (
        <>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.movies !== undefined ? props.movies.map(movie => {
                    return <Grid container={true} justify={'center'} key={movie.id}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{height: 565}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={movie.title}
                                    subheader={`Release Date: ${formatDate(movie.release_date)}`}
                                    action={
                                        <>
                                            {!(favoriteMovies.filter(f => f.movieDBId == movie.id && f.favoriteType === FavoriteType.MOVIE).length > 0) ?
                                                <>
                                                    <IconButton aria-label="settings"
                                                                style={{display: (deleteLoading || createLoading || props.initialStateLoading) ? 'none' : 'inline-flex'}}
                                                                onClick={addFavorite}
                                                                id={`${movie.id}`}>
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
                                                                id={`${movie.id}`}
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
                                               id={`${movie.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 480}}
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
