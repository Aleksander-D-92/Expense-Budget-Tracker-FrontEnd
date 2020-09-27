import axios, {AxiosResponse} from 'axios'

interface TvShowCollection {
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

const TvShowsService = (function () {
    const API_KEY = '2e0bd1aa1c128cb18713465fe5dbfb12';

    function getPopular(page: number): Promise<AxiosResponse<TvShowCollection>> {
        return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    }

    return {
        getPopular: (page: number) => getPopular(page)
    }
})();
export {TvShowsService}
