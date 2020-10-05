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
import ScrollAnimation from "react-animate-on-scroll";


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
            <ScrollAnimation animateIn={'fadeInUp'}>
                <Grid container={true} justify={'center'} spacing={5}>
                    <FavoriteCard label={'Movies'} count={favoritesView.movies.length}/>
                    <FavoriteCard label={'TV Shows'} count={favoritesView.tvShows.length}/>
                    <FavoriteCard label={'Actors'} count={favoritesView.actors.length}/>

                </Grid>
            </ScrollAnimation>
            <Grid container={true} justify={'center'} spacing={5}>
                <Grid xs={11}>
                    <ScrollAnimation animateIn={'fadeInLeft'}>
                        <FavoriteMovieCarousel movies={favoritesView.movies}/>
                    </ScrollAnimation>
                </Grid>
                <Grid xs={11}>
                    <ScrollAnimation animateIn={'fadeInRight'}>
                        <FavoriteTvShowCarousel tvShows={favoritesView.tvShows}/>
                    </ScrollAnimation>
                </Grid>
                <Grid xs={11}>
                    <ScrollAnimation animateIn={'fadeInLeft'}>
                        <FavoriteActorsCarousel actors={favoritesView.actors}/>
                    </ScrollAnimation>
                </Grid>
            </Grid>
        </>
    )
}

export {FavoriteController}
