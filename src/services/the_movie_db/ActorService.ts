import axios, {AxiosResponse} from 'axios'

export interface ActorDetails {
    birthday: Date
    known_for_department: string
    deathday: Date | null
    id: number
    name: string
    also_known_as: string[]
    gender: number
    biography: string
    popularity: number
    place_of_birth: string
    profile_path: string
    adult: boolean
    imdb_id: string
    homepage: string | null
}

export interface ActorMovieOrTvCreditsResponse {
    cast: ActorMovieCredits[]
}

export interface ActorMovieCredits {
    character: string
    credit_id: string
    release_date: Date
    vote_count: number
    video: boolean
    adult: boolean
    vote_average: number
    title: string
    genre_ids: number[]
    original_language: string
    original_title: string
    popularity: number
    id: number
    backdrop_path: string
    overview: string
    poster_path: string
}

const ActorService = (function () {
    const API_KEY = '2e0bd1aa1c128cb18713465fe5dbfb12';

    function getDetails(id: number): Promise<AxiosResponse<ActorDetails>> {
        return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`);
    }

    function getActorMovieCredits(id: number): Promise<AxiosResponse<ActorMovieOrTvCreditsResponse>> {
        return axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
    }

    function getActorTvCredits(id: number): Promise<AxiosResponse<ActorMovieOrTvCreditsResponse>> {
        return axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`)
    }

    return {
        getDetails: (id: number) => getDetails(id),
        getActorMovieCredits: (id: number) => getActorMovieCredits(id),
        getActorTvCredits: (id: number) => getActorTvCredits(id),
    }
})();

export {ActorService}
