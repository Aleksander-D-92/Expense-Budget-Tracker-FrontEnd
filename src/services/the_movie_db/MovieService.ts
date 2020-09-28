import axios, {AxiosResponse} from 'axios'

export interface MovieCollection {
    page: string
    total_pages: number
    total_results: number
    results: Movie[]
}

export interface MovieCollectionWithDates extends MovieCollection {
    dates: {
        maximum: Date,
        minimum: Date
    }
}

export interface Movie {
    id: number
    adult: boolean
    backdrop_path: string // golqm image
    poster_path: string // po maluk image sus nekvo opisanie
    genre_ids: number[]
    original_language: string
    original_title: string
    title: string
    overview: string
    popularity: number
    release_date: Date
    video: boolean
    vote_average: number
    vote_count: number
}

export interface MovieDetails {
    id: number
    adult: boolean
    backdrop_path: string
    poster_path: string
    original_language: string
    original_title: string
    title: string
    overview: string
    popularity: number
    release_date: Date
    video: boolean
    vote_average: number
    vote_count: number
    genres: Genre[]
    production_companies: ProductionCompany[],
    production_countries: ProductionCountry[],
    spoken_languages: SpokenLanguages[]
}

interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

interface ProductionCountry {
    iso_3166_1: string
    name: string
}

interface SpokenLanguages {
    iso_639_1: string
    name: string
}

interface GetGenresResp {
    genres: Genre[]
}

export interface Genre {
    id: number
    name: string
}

export interface Credits {
    id: number,
    cast: CastOrCrew[]
    crew: CastOrCrew[]
}

export interface CastOrCrew {
    cast_id: number
    character: string
    credit_id: string
    gender: number
    id: string
    name: string
    order: number
    profile_path: string
}

const MovieService = (function () {
    const API_KEY = '2e0bd1aa1c128cb18713465fe5dbfb12';

    function getPopular(page: number): Promise<AxiosResponse<MovieCollection>> {
        return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    }

    function getTopRated(page: number): Promise<AxiosResponse<MovieCollection>> {
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    }

    function getUpComing(page: number): Promise<AxiosResponse<MovieCollectionWithDates>> {
        return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
    }

    //Get a list of movies in theatres that are playing now
    function getNowPlaying(page: number): Promise<AxiosResponse<MovieCollectionWithDates>> {
        return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
    }

    function getByTitle(title: string, page: number): Promise<AxiosResponse<MovieCollection>> {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=${page}&include_adult=false`);

    }

    function getDetails(movieId: number): Promise<AxiosResponse<MovieDetails>> {
        return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    }

    //returns the cast crew
    function getCredits(movieId: number): Promise<AxiosResponse<Credits>> {
        return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    }

    function getGenres(): Promise<AxiosResponse<GetGenresResp>> {
        return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    }

    return {
        getPopular: (page: number) => getPopular(page),
        getTopRated: (page: number) => getTopRated(page),
        getUpComing: (page: number) => getUpComing(page),
        getNowPlaying: (page: number) => getNowPlaying(page),
        getCredits: (movieId: number) => getCredits(movieId),
        getByTitle: (title: string, page: number) => getByTitle(title, page),
        getDetails: (movieId: number) => getDetails(movieId),
        getGenres: () => getGenres()
    }
})();

export {MovieService}
