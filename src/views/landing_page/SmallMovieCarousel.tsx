import React, {MouseEvent, useEffect} from "react";
import CloseIcon from '@material-ui/icons/Close';
import Carousel from "react-multi-carousel";
import {Movie} from "../../services/the_movie_db/MovieService";
import {Card, CardHeader, CardMedia, Grid, IconButton, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {formatDate} from "../../shared/utils/functions";
import './css/LadningPage.css'
import {useHistory} from 'react-router-dom';
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {useMutation} from "@apollo/client";
import {
    CREATE_FAVORITE,
    CreateFavoriteResp,
    CreateFavoriteVars, DELETE_FAVORITE, DeleteFavoriteVars,
    FavoriteType
} from "../../services/apollo/mutations/FavoriteMutations";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";
import {addFavoriteAction} from "../../config/redux/Favorites";
import {Dummy} from "../../services/apollo/ApoloConfig";

interface Props {
    movies?: Movie[],
}

function SmallMovieCarousel(props: Props) {
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favorites = useSelector((state: ReduxState) => state.favorites.filter(e => e.favoriteType === FavoriteType.MOVIE)).map(e => e.movieDBId);
    // console.log(favorites);

    const dispatch = useDispatch();

    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE)
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    function addFavorite(e: MouseEvent) {
        // console.log(e.currentTarget.id);
        createFavorite({
            variables: {
                userId: userId,
                movieDBId: parseInt(e.currentTarget.id),
                favoriteType: FavoriteType.MOVIE
            }
        }).catch((e) => {
            // console.log(e.graphQLErrors[0].message);
        })
    }

    function removeFavorite(e: MouseEvent) {
        deleteFavorite({variables: {favoriteId: 1}})
            .then((e) => {
                // console.log(e);
            });
    }

    useEffect(() => {
        if (data === undefined || data === null) {
            return;
        } else {
            dispatch(addFavoriteAction(data.createFavorite));
        }
    }, [data, dispatch])

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
                                            {!(favorites.filter(f => f == movie.id).length > 0) ?
                                                <IconButton aria-label="settings" onClick={addFavorite}
                                                            id={`${movie.id}`}>
                                                    <Tooltip title={"Click to Add to favorites"}
                                                             placement={'top'}
                                                             arrow={true}>
                                                        <AddIcon/>
                                                    </Tooltip>
                                                </IconButton>
                                                :
                                                <IconButton aria-label="settings" onClick={removeFavorite}
                                                            id={`${movie.id}`}>
                                                    <Tooltip title={"Click to Remove from favorites"}
                                                             placement={'top'}
                                                             arrow={true}>
                                                        <CloseIcon/>
                                                    </Tooltip>
                                                </IconButton>
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
