import {MovieDetails} from "../../services/the_movie_db/MovieService";
import {TVShowDetails} from "../../services/the_movie_db/TvShowsService";
import {ActorDetails} from "../../services/the_movie_db/ActorService";
import {cloneDeep} from 'lodash'

export interface FavoriteVIewState {
    movies: MovieDetails[],
    tvShows: TVShowDetails[],
    actors: ActorDetails[]
}

interface Action {
    type: string,
    payload: MovieDetails | TVShowDetails | ActorDetails
}

const ADD_MOVIE = 'ADD_MOVIE';
const DELETE_MOVIE = 'REMOVE_MOVIE';
const ADD_TV_SHOW = 'REMOVE_TV';
const DELETE_TV = 'REMOVE_TV';
const ADD_ACTOR = 'ADD_ACTOR';
const DELETE_ACTOR = 'REMOVE_ACTOR';
const DELETE_FAVORITE_VIEW_STATE = 'DELETE_STATE'


function addMovieAction(payload: MovieDetails) {
    return {
        type: ADD_MOVIE,
        payload: payload
    }
}

function deleteMovieAction(payload: MovieDetails) {
    return {
        type: DELETE_MOVIE,
        payload: payload
    }
}

function addTvShowAction(payload: TVShowDetails) {
    return {
        type: ADD_TV_SHOW,
        payload: payload
    }
}

function addActorAction(payload: ActorDetails) {
    return {
        type: ADD_ACTOR,
        payload: payload
    }
}

function deleteFavoriteViewState() {
    return {
        type: DELETE_FAVORITE_VIEW_STATE,
    }
}

function favoriteViewReducer(state: FavoriteVIewState = {movies: [], tvShows: [], actors: []}, action: Action) {
    let newState = {};
    switch (action.type) {
        case ADD_MOVIE:
            newState = cloneDeep(state);
            // @ts-ignore
            newState.movies.push(action.payload);
            return newState;
        case DELETE_MOVIE:
            newState = cloneDeep(state);
            console.log(newState);
            // @ts-ignore
            newState.movies = newState.movies.filter(m => m.id != action.payload.id)
            console.log(newState);
            return newState;
        case ADD_TV_SHOW:
            newState = cloneDeep(state);
            // @ts-ignore
            newState.tvShows.push(action.payload)
            return newState
        case DELETE_TV:
            newState = cloneDeep(state);
            // @ts-ignore
            return newState.tvShows.filter(m => m.id !== action.payload.id)
        case ADD_ACTOR:
            newState = cloneDeep(state);
            // @ts-ignore
            newState.actors.push(action.payload)
            return newState
        case DELETE_ACTOR:
            newState = cloneDeep(state);
            // @ts-ignore
            return newState.actors.filter(m => m.id !== action.payload.id)
        case DELETE_FAVORITE_VIEW_STATE:
            return {movies: [], tvShows: [], actors: []}
        default:
            return state

    }
}

export {
    favoriteViewReducer,
    addMovieAction,
    addTvShowAction,
    addActorAction,
    deleteFavoriteViewState,
    deleteMovieAction
}
