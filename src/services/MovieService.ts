import axios, {AxiosResponse} from 'axios'


interface MovieCollection {
    page: string
    total_pages: number
    total_results: number
    results: Movie[]
}

interface MovieCollectionWithDates extends MovieCollection {
    dates: {
        maximum: Date,
        minimum: Date
    }
}

interface Movie {
    id: number
    adult: boolean
    backdrop_path: string
    poster_path: string
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

interface MovieDetails {
    id: number
    adult: boolean
    backdrop_path: string
    poster_path: string
    genres: Genres[]
    original_language: string
    original_title: string
    title: string
    overview: string
    popularity: number
    release_date: Date
    video: boolean
    vote_average: number
    vote_count: number
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

interface Genres {
    id: number
    name: string
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

    function getDetails(movieId: number): Promise<AxiosResponse<MovieDetails>> {
        return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    }

    return {
        getPopular: (page: number) => getPopular(page),
        getTopRated: (page: number) => getTopRated(page),
        getUpComing: (page: number) => getUpComing(page),
        getNowPlaying: (page: number) => getNowPlaying(page),
        getDetails: (movieId: number) => getDetails(movieId),
    }
})();

export {MovieService}
