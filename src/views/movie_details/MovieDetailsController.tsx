import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import {Credits, MovieDetails, MovieService} from "../../services/the_movie_db/MovieService";
import {CastCarousel} from "../shered/CastCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {Typography} from "@material-ui/core";
import {MovieDescription} from "./MovieDescription";
import {MovieTvShowBackground} from "../shered/MovieTvShowBackground";
import './css/MovieDetails.css'
import {PageLoading} from "../shered/PageLoading";
import {CommentSubmitForm} from "../comment/CommentSubmitForm";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_COMMENT, CreateCommentResp, CreateCommentVars} from "../../services/apollo/mutations/CommentsMutations";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";
import {
    GET_ALL_COMMENTS_BY_MOVIE_DB_ID,
    GetAllCommentsByMovieDBIdResp,
    GetAllCommentsByMovieDBIdVars
} from "../../services/apollo/queries/CommentQueries";


function MovieDetailsController() {
    const history = useHistory();
    const state = useSelector((state: ReduxState) => state.userDetails);
    const {movieId} = useParams();
    const [movieCredits, setMovieCredits] = useState<Credits>();
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const [createComment, {loading: createCommentLoading}] = useMutation<CreateCommentResp, CreateCommentVars>(CREATE_COMMENT);
    const {data, loading} = useQuery<GetAllCommentsByMovieDBIdResp, GetAllCommentsByMovieDBIdVars>(GET_ALL_COMMENTS_BY_MOVIE_DB_ID, {
        variables: {
            movieDBId: movieId,
            favoriteType: FavoriteType.MOVIE
        }
    });
    useEffect(() => {
        MovieService.getDetails(movieId).then((e) => {
            setMovieDetails(e.data);
        });
        MovieService.getCredits(movieId).then((e) => {
            setMovieCredits(e.data);
        });
    }, [movieId]);

    useEffect(() => {
        console.log(data?.allCommentsByMovieDBIdAndFavoriteType);
        console.log(data?.allCommentsByMovieDBIdAndFavoriteType.map(c => c.title).join(", "));
    }, [data]);

    function submitComment(data: any, e: any) {
        e.target.reset();
        if (state.userId === undefined || state.userId === null || movieDetails === undefined) {
            history.push('/users/login');
            return;
        }

        createComment({
            variables: {
                userId: state.userId,
                movieDBId: movieDetails.id,
                favoriteType: FavoriteType.MOVIE,
                title: data.title,
                description: data.description
            }
        }).then((e) => {
            if (e.data !== null && e.data !== undefined) {
                console.log(e.data.createComment.title);
                console.log(e.data.createComment.description);
                console.log(e.data.createComment);
            }
        })
    }

    return (
        <>
            <PageLoading loading={movieCredits === undefined || movieDetails === undefined}/>
            <MovieTvShowBackground backdrop_path={movieDetails?.backdrop_path}
                                   poster_path={movieDetails?.poster_path}
                                   title={movieDetails?.title}
                                   genres={movieDetails?.genres}
                                   vote_average={movieDetails?.vote_average}/>
            <ScrollAnimation animateIn={'fadeInUp'}>
                <MovieDescription movieDetails={movieDetails}/>
            </ScrollAnimation>
            <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                Cast
            </Typography>
            <ScrollAnimation animateIn={'fadeInLeft'}>
                <CastCarousel cast={movieCredits?.cast}/>
            </ScrollAnimation>
            <ScrollAnimation animateIn={'fadeInUp'}>
                <CommentSubmitForm submitComment={submitComment} loading={createCommentLoading}/>
            </ScrollAnimation>
        </>
    )
}

export {MovieDetailsController}
