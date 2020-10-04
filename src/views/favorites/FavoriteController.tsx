import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {Card, Grid} from "@material-ui/core";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";
import {MovieDetails, MovieService} from "../../services/the_movie_db/MovieService";
import {TVShowDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {ActorDetails, ActorService} from "../../services/the_movie_db/ActorService";
import {FavoriteCard} from "./FavoriteCard";


function FavoriteController() {
    const favorites = useSelector((state: ReduxState) => state.favorites);

    const [favoriteMovies, setFavoriteMovies] = useState<MovieDetails[]>([]);
    const [favoriteTv, setFavoriteTv] = useState<TVShowDetails[]>([]);
    const [favoriteActors, setFavoriteActors] = useState<ActorDetails[]>();

    // let movies: MovieDetails[] = [];
    // let tvShows: TVShowDetails[] = [];
    // let actors: ActorDetails[] = [];

    useEffect(() => {
        favorites.forEach((fav) => {
            switch (fav.favoriteType) {
                case FavoriteType.MOVIE:
                    MovieService.getDetails(fav.movieDBId).then((e) => {
                        setFavoriteMovies([...favoriteMovies, e.data])
                        // movies.push(e.data);
                        // console.log('movies');
                        // console.log(movies);
                    });
                    break;
                case FavoriteType.TV:
                    TvShowsService.getDetails(fav.movieDBId).then((e) => {
                        setFavoriteTv([...favoriteTv, e.data])
                        // tvShows.push(e.data);
                        // console.log('tvshows');
                        // console.log(tvShows);
                    });
                    break;
                case FavoriteType.ACTOR:
                    ActorService.getDetails(fav.movieDBId).then((e) => {
                        // actors.push(e.data)
                        // console.log('actors.log');
                        // console.log(actors);
                    });
                    break;
            }
        })
    }, []);
    // useEffect(()=>{
    //     console.log('actors ot useeefect');
    //     setFavoriteActors(actors)
    // },[actors])
    //fetch favorites from movieDB
    return (
        <>
            <Grid container={true} justify={'center'} spacing={5}>
                <FavoriteCard label={'Movies'} count={favoriteMovies?.length} loading={favoriteMovies === undefined}
                              favorites={favoriteMovies}/>
                <FavoriteCard label={'TV Shows'} count={favoriteTv?.length} loading={favoriteTv === undefined}
                              favorites={favoriteTv}/>
                <FavoriteCard label={'Actors'} count={favoriteActors?.length} loading={favoriteActors === undefined}
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
