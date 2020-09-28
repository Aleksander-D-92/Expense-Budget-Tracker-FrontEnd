import axios, {AxiosResponse} from 'axios'
import {Genre, Credits} from "./MovieService";

export interface TvShowCollection {
    page: string
    total_pages: number
    total_results: number
    results: TvShow[]
}

export interface TvShow {
    id: number
    name: string
    original_name: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    popularity: number
    first_air_date: Date
    genre_ids: number[]
    vote_count: number
    origin_country: string[]
    original_language: string
    overview: string
}

export interface TVShowDetails extends TvShow {
    genres: Genre[]
    production_companies: ProductionCompany[]
    seasons: Season[]
    networks: NetWork[]
}

interface NetWork {
    id: number
    name: string
    logo_path: string
    origin_country: string
}

export interface Season {
    air_date: Date
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
}


export interface SeasonDetails extends Season {
    episodes: Episode[];
}

export interface Episode {
    id: number
    episode_number: number
    air_date: Date
    name: string
    overview: string
    production_code: number
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
}

interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

//todo upComing popular nowPlaying
const TvShowsService = (function () {
        const API_KEY = '2e0bd1aa1c128cb18713465fe5dbfb12';

        //Get a list of the current popular TV shows on TMDb. This list updates daily.
        function getPopular(page: number): Promise<AxiosResponse<TvShowCollection>> {
            return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        }

        //Get a list of the top rated TV shows on TMDb.
        function getTopRated(page: number): Promise<AxiosResponse<TvShowCollection>> {
            return axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);

        }

        //Get a list of shows that are currently on the air.
        function getOnTheAir(page: number): Promise<AxiosResponse<TvShowCollection>> {
            return axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`);
        }

        //Get the primary TV show details by id.
        function getDetails(id: number): Promise<AxiosResponse<TVShowDetails>> {
            return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
        }

        //cast and crew
        function getCredits(id: number): Promise<AxiosResponse<Credits>> {
            return axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
        }

        function getSeasonDetails(id: number, season: number): Promise<AxiosResponse<SeasonDetails>> {
            return axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`);
        }

        return {
            getPopular: (page: number) => getPopular(page),
            getTopRated: (page: number) => getTopRated(page),
            getOnTheAir: (page: number) => getOnTheAir(page),
            getDetails: (id: number) => getDetails(id),
            getCredits: (id: number) => getCredits(id),
            getSeasonDetails: (id: number, season: number) => getSeasonDetails(id, season),
        }
    }

)();
export {TvShowsService}
