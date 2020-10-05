import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {Card, Grid} from "@material-ui/core";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";
import {MovieDetails, MovieService} from "../../services/the_movie_db/MovieService";
import {TVShowDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {ActorDetails, ActorService} from "../../services/the_movie_db/ActorService";
import {FavoriteCard} from "./FavoriteCard";
import {addActorAction, addMovieAction, addTvShowAction} from "../../config/redux/FavoriteVIew";


function FavoriteController() {
    const favorites = useSelector((state: ReduxState) => state.favorites);
    const dispatch = useDispatch();
    const stateArray = useSelector((state: ReduxState) => state.favoritesView)

    const [favoriteMovies, setFavoriteMovies] = useState<MovieDetails[]>([]);
    const [favoriteTv, setFavoriteTv] = useState<TVShowDetails[]>([]);
    const [favoriteActors, setFavoriteActors] = useState<ActorDetails[]>();


    useEffect(() => {
        favorites.forEach((fav) => {
            switch (fav.favoriteType) {
                case FavoriteType.MOVIE:
                    MovieService.getDetails(fav.movieDBId).then((e) => {
                        dispatch(addMovieAction(e.data));
                    });
                    break;
                case FavoriteType.TV:
                    TvShowsService.getDetails(fav.movieDBId).then((e) => {
                        dispatch(addTvShowAction(e.data));
                    });
                    break;
                case FavoriteType.ACTOR:
                    ActorService.getDetails(fav.movieDBId).then((e) => {
                        dispatch(addActorAction(e.data));
                    });
                    break;
            }
        })
    }, []);

    return (
        <>
            <Grid container={true} justify={'center'} spacing={5}>

                <FavoriteCard label={'Movies'} count={0} loading={stateArray === undefined}
                              favorites={favoriteMovies}/>
                <FavoriteCard label={'TV Shows'} count={0} loading={stateArray === undefined}
                              favorites={favoriteTv}/>
                <FavoriteCard label={'Actors'} count={0} loading={stateArray === undefined}
                              favorites={favoriteActors}/>
            </Grid>
            <Grid container={true} justify={'center'} spacing={5}>
                <Grid xs={9}>
                    <Card elevation={10} className={'mt-4'}>
                        <h1>sdaasd</h1>
                        {favoriteTv?.map(e => e.name).join(", ")}
                        {favoriteMovies?.map(e => e.title).join(", ")}
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {FavoriteController}
