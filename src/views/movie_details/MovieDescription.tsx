import React, {MouseEvent} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from "@material-ui/core";
import {MovieDetails} from "../../services/the_movie_db/MovieService";
import {formatDate} from "../../shared/utils/functions";
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
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
    movieDetails?: MovieDetails
}

function MovieDescription(props: Props) {
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favoriteMovies = useSelector((state: ReduxState) => state.favorites.filter(f => f.favoriteType === FavoriteType.MOVIE));
    const dispatch = useDispatch();
    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE)

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
            <Grid container={true} justify={'center'}>
                <Grid xs={11}>
                    <Card elevation={10} className={'mt-2'}>
                        <CardHeader
                            title="Movie Info"
                            action={
                                <>
                                    {!(favoriteMovies.filter(f => f.movieDBId == props.movieDetails?.id && f.favoriteType === FavoriteType.MOVIE).length > 0) ?
                                        <>
                                            <IconButton aria-label="settings"
                                                        style={{display: (deleteLoading || createLoading) ? 'none' : 'inline-flex'}}
                                                        onClick={addFavorite}
                                                        id={`${props.movieDetails?.id}`}>
                                                <Tooltip title={"Click to Add to favorites"}
                                                         placement={'top'}
                                                         arrow={true}>
                                                    <AddIcon fontSize={'large'}/>
                                                </Tooltip>
                                            </IconButton>
                                            <CircularProgress size={40}
                                                              thickness={15}
                                                              style={{display: (deleteLoading || createLoading) ? 'block' : 'none'}}/>
                                        </>
                                        :
                                        <>
                                            <IconButton aria-label="settings"
                                                        id={`${props.movieDetails?.id}`}
                                                        style={{display: (deleteLoading || createLoading) ? 'none' : 'inline-flex'}}
                                                        onClick={(e: MouseEvent) => removeFavorite(e)}>
                                                <Tooltip title={"Click to Remove from favorites"}
                                                         placement={'top'}
                                                         arrow={true}>
                                                    <CloseIcon fontSize={'large'}/>
                                                </Tooltip>
                                            </IconButton>
                                            <CircularProgress size={45}
                                                              thickness={15}
                                                              style={{display: (deleteLoading || createLoading) ? 'block' : 'none'}}/>
                                        </>
                                    }
                                </>
                            }
                        />
                        <CardContent>
                            <Typography variant={'h6'}>
                                Summary
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.movieDetails?.overview}
                            </Typography>
                            <Typography variant={'h6'}>
                                Release Date
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {formatDate(props.movieDetails?.release_date)}
                            </Typography>
                            <Typography variant={'h6'}>
                                Production Companies
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.movieDetails?.production_companies.map(company => company.name).join(", ")}
                            </Typography>
                            <Typography variant={'h6'}>
                                Production Countries
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.movieDetails?.production_countries.map(country => country.name).join(", ")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {MovieDescription}
