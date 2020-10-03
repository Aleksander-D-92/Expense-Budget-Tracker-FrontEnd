import React, {MouseEvent} from "react";
import {ActorDetails} from "../../services/the_movie_db/ActorService";
import {Card, CardContent, CardHeader, CircularProgress, IconButton, Tooltip, Typography} from "@material-ui/core";
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
    actorDetails?: ActorDetails
}

function ActorDescription(props: Props) {
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favoriteActors = useSelector((state: ReduxState) => state.favorites.filter(f => f.favoriteType === FavoriteType.ACTOR));
    const dispatch = useDispatch();

    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE);
    function addFavorite(e: MouseEvent) {
        createFavorite({
            variables: {
                userId: userId,
                movieDBId: parseInt(e.currentTarget.id),
                favoriteType: FavoriteType.ACTOR
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
        const id = favoriteActors.find(f => f.movieDBId == parseInt(currentTargetId)).favoriteId;
        if (id === undefined) {
            return;
        }
        deleteFavorite({
            variables:
                {
                    favoriteId: id
                }
        }).then(() => {
            let fav = favoriteActors.find(f => f.favoriteId == id);
            if (fav !== undefined) {
                dispatch(deleteFavoriteAction(fav))
            }
        })
    }
    return (
        <>
            <Card elevation={10} className={'mt-2'}>
                <CardHeader title={props.actorDetails?.name}
                            action={
                                <>
                                    {!(favoriteActors.filter(f => f.movieDBId == props.actorDetails?.id && f.favoriteType === FavoriteType.ACTOR).length > 0) ?
                                        <>
                                            <IconButton aria-label="settings"
                                                        style={{display: (deleteLoading || createLoading) ? 'none' : 'inline-flex'}}
                                                        onClick={addFavorite}
                                                        id={`${props.actorDetails?.id}`}>
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
                                                        id={`${props.actorDetails?.id}`}
                                                        style={{display: (deleteLoading || createLoading) ? 'none' : 'inline-flex'}}
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
                        Biography
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {props.actorDetails?.biography}
                    </Typography>
                    <Typography variant={'h6'}>
                        Birthday
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {formatDate(props.actorDetails?.birthday)}
                    </Typography>
                    <Typography variant={'h6'}>
                        Place of birth
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {props.actorDetails?.place_of_birth}
                    </Typography>
                    <Typography variant={'h6'}>
                        Also Known As
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {props.actorDetails?.also_known_as.join(", ")}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export {ActorDescription}
