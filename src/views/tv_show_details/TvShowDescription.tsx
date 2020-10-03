import React, {MouseEvent, useEffect, useState} from "react";
import {TVShowDetails} from "../../services/the_movie_db/TvShowsService";
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
    tvShowDetails?: TVShowDetails
}

function TvShowDescription(props: Props) {
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favoriteTV = useSelector((state: ReduxState) => state.favorites.filter(f => f.favoriteType === FavoriteType.TV));
    const dispatch = useDispatch();
    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE)

    const [totalEpisodes, setTotalEpisodes] = useState<number>(0)
    useEffect(() => {
        let count = 0;
        props.tvShowDetails?.seasons.forEach(e => {
            count += e.episode_count;
        })
        setTotalEpisodes(count);
    }, [props.tvShowDetails])

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
            <Grid container={true} justify={'center'}>
                <Grid xs={11}>
                    <Card elevation={10} className={'mt-2'}>
                        <CardHeader
                            title="Tv Show Info"
                            action={
                                <>
                                    {!(favoriteTV.filter(f => f.movieDBId == props.tvShowDetails?.id && f.favoriteType === FavoriteType.TV).length > 0) ?
                                        <>
                                            <IconButton aria-label="settings"
                                                        style={{display: (deleteLoading || createLoading ) ? 'none' : 'inline-flex'}}
                                                        onClick={addFavorite}
                                                        id={`${props.tvShowDetails?.id}`}>
                                                <Tooltip title={"Click to Add to favorites"}
                                                         placement={'top'}
                                                         arrow={true}>
                                                    <AddIcon fontSize={'large'}/>
                                                </Tooltip>
                                            </IconButton>
                                            <CircularProgress size={40}
                                                              thickness={15}
                                                              style={{display: (deleteLoading || createLoading ) ? 'block' : 'none'}}/>
                                        </>
                                        :
                                        <>
                                            <IconButton aria-label="settings"
                                                        id={`${props.tvShowDetails?.id}`}
                                                        style={{display: (deleteLoading || createLoading ) ? 'none' : 'inline-flex'}}
                                                        onClick={(e: MouseEvent) => removeFavorite(e)}>
                                                <Tooltip title={"Click to Remove from favorites"}
                                                         placement={'top'}
                                                         arrow={true}>
                                                    <CloseIcon fontSize={'large'}/>
                                                </Tooltip>
                                            </IconButton>
                                            <CircularProgress size={40}
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
                                {props.tvShowDetails?.overview}
                            </Typography>
                            <Typography variant={'h6'}>
                                Release Date
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {formatDate(props.tvShowDetails?.first_air_date)}
                            </Typography>
                            <Typography variant={'h6'}>
                                Production Companies
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.tvShowDetails?.production_companies.map(company => company.name).join(", ")}
                            </Typography>
                            <Typography variant={'h6'} gutterBottom={true}>
                                Number of Seasons: {props.tvShowDetails?.seasons.length}
                            </Typography>
                            <Typography variant={'h6'} gutterBottom={true}>
                                Total of Episodes: {totalEpisodes}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {TvShowDescription}
