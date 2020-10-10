import React, {MouseEvent} from "react";
import {useHistory} from "react-router-dom";
import {CastOrCrew} from "../../services/the_movie_db/MovieService";
import Carousel from "react-multi-carousel";
import {Card, CardHeader, CardMedia, CircularProgress, Grid, IconButton, Tooltip, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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
import {LinkToDetails} from "./LinkToDetails";
import {MediaType} from "../../services/the_movie_db/MultiSearchService";

interface Props {
    cast?: CastOrCrew[]
}

function CastCarousel(props: Props) {
    const history = useHistory();
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const favoriteActors = useSelector((state: ReduxState) => state.favorites.filter(f => f.favoriteType === FavoriteType.ACTOR));
    const dispatch = useDispatch();

    const [createFavorite, {data, loading: createLoading}] = useMutation<CreateFavoriteResp, CreateFavoriteVars>(CREATE_FAVORITE);
    const [deleteFavorite, {loading: deleteLoading}] = useMutation<Dummy, DeleteFavoriteVars>(DELETE_FAVORITE);

    const imageBasePath = 'https://image.tmdb.org/t/p/h632';

    function addFavorite(e: MouseEvent) {
        if (userId === undefined) {
            history.push("/users/login");
            return
        }
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
        if (userId === undefined) {
            history.push("/users/login");
            return
        }
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

    function redirect(e: MouseEvent) {
        history.push(`/actors/${e.currentTarget.id}`)
    }

    function playingAs(val: string): string {
        let arr = val.split(' / ');
        if (arr.length <= 1) {
            return val;
        } else {
            return `${arr[0]}, ${arr[1]} and others...`
        }
    }

    return (
        <>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.cast !== undefined ? props.cast.map(cast => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{maxHeight: 600, minHeight: 600}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={<LinkToDetails mediaType={MediaType.person}
                                                          value={cast.name}
                                                          id={cast.id}/>}
                                    subheader={`Playing: ${playingAs(cast.character)}`}
                                    action={
                                        <>
                                            {!(favoriteActors.filter(f => f.movieDBId == cast.id && f.favoriteType === FavoriteType.ACTOR).length > 0) ?
                                                <>
                                                    <IconButton aria-label="settings"
                                                                style={{display: (deleteLoading || createLoading) ? 'none' : 'inline-flex'}}
                                                                onClick={addFavorite}
                                                                id={`${cast.id}`}>
                                                        <Tooltip title={"Click to Add to favorites"}
                                                                 placement={'top'}
                                                                 arrow={true}>
                                                            <AddIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <CircularProgress size={30}
                                                                      thickness={10}
                                                                      style={{display: (deleteLoading || createLoading) ? 'block' : 'none'}}/>
                                                </>
                                                :
                                                <>
                                                    <IconButton aria-label="settings"
                                                                id={`${cast.id}`}
                                                                style={{display: (deleteLoading || createLoading) ? 'none' : 'inline-flex'}}
                                                                onClick={(e: MouseEvent) => removeFavorite(e)}>
                                                        <Tooltip title={"Click to Remove from favorites"}
                                                                 placement={'top'}
                                                                 arrow={true}>
                                                            <CloseIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <CircularProgress size={30}
                                                                      thickness={10}
                                                                      style={{display: (deleteLoading || createLoading) ? 'block' : 'none'}}/>
                                                </>
                                            }
                                        </>
                                    }
                                />
                                <Tooltip title={"Double Click to see details"} placement={'top'}>
                                    {cast.profile_path !== null ? <CardMedia className={'landingPageSmallImage'}
                                                                             id={`${cast.id}`}
                                                                             onDoubleClick={redirect}
                                                                             style={{height: 510}}
                                                                             image={imageBasePath + cast.profile_path}
                                        /> :
                                        <>
                                            <Typography variant={'h5'} align={'center'}>
                                                No image available <br/> <HighlightOffIcon fontSize={'large'}/>
                                            </Typography>
                                        </>
                                    }
                                </Tooltip>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
        </>
    )
}

export {CastCarousel}
