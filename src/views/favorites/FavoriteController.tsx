import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {Grid} from "@material-ui/core";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";
import {MovieService} from "../../services/the_movie_db/MovieService";
import {TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {ActorService} from "../../services/the_movie_db/ActorService";
import {FavoriteCard} from "./FavoriteCard";
import {
    addActorAction,
    addMovieAction,
    addTvShowAction,
    deleteFavoriteViewState
} from "../../config/redux/FavoriteVIew";
import {FavoriteMovieCarousel} from "./FavoriteMovieCarousel";
import {FavoriteTvShowCarousel} from "./FavoriteTvShowCarousel";
import {FavoriteActorsCarousel} from "./FavoriteActorsCarousel";


function FavoriteController() {
    const dispatch = useDispatch();
    const favorites = useSelector((state: ReduxState) => state.favorites);
    const favoritesView = useSelector((state: ReduxState) => state.favoritesView);

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
    useEffect(() => {
        return () => {
            console.log('componenet will dismount');
            dispatch(deleteFavoriteViewState());
        }
    }, [])
    return (
        <>
            <Grid container={true} justify={'center'} spacing={5}>
                <FavoriteCard label={'Movies'} count={favoritesView.movies.length}/>
                <FavoriteCard label={'TV Shows'} count={favoritesView.tvShows.length}/>
                <FavoriteCard label={'Actors'} count={favoritesView.actors.length}/>
            </Grid>
            <Grid container={true} justify={'center'} spacing={5}>
                <Grid xs={12}>
                    <FavoriteMovieCarousel movies={favoritesView.movies}/>
                </Grid>
                <Grid xs={12}>
                    <FavoriteTvShowCarousel tvShows={favoritesView.tvShows}/>
                </Grid>
                <Grid xs={12}>
                    <FavoriteActorsCarousel actors={favoritesView.actors}/>
                </Grid>
            </Grid>
        </>
    )
}

export {FavoriteController}
