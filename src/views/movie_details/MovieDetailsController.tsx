import React, {BaseSyntheticEvent, MouseEvent, useEffect, useState} from "react";
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
import {
    CREATE_COMMENT,
    CreateCommentResp,
    CreateCommentVars,
    DELETE_COMMENT,
    DeleteCommentVars, UPDATE_COMMENT, UpdateCommentResp, UpdateCommentVars
} from "../../services/apollo/mutations/CommentsMutations";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";
import {
    CommentResp,
    GET_ALL_COMMENTS_BY_MOVIE_DB_ID,
    GetAllCommentsByMovieDBIdResp,
    GetAllCommentsByMovieDBIdVars
} from "../../services/apollo/queries/CommentQueries";
import {CommentList} from "../comment/CommentList";
import {Dummy} from "../../services/apollo/ApoloConfig";


function MovieDetailsController() {
    const history = useHistory();
    const userDetails = useSelector((state: ReduxState) => state.userDetails);
    const {movieId} = useParams();
    const [movieCredits, setMovieCredits] = useState<Credits>();
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const [comments, setComments] = useState<CommentResp[]>();
    const [createComment, {loading: createCommentLoading}] = useMutation<CreateCommentResp, CreateCommentVars>(CREATE_COMMENT);
    const [updateComment, {loading: updateCommentLoading}] = useMutation<UpdateCommentResp, UpdateCommentVars>(UPDATE_COMMENT);
    const [deleteComment, {loading: deleteCommentLoading}] = useMutation<Dummy, DeleteCommentVars>(DELETE_COMMENT);
    const {data: initialComments, loading: initialCommentsLoading, refetch} = useQuery<GetAllCommentsByMovieDBIdResp, GetAllCommentsByMovieDBIdVars>(GET_ALL_COMMENTS_BY_MOVIE_DB_ID, {
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
        if (initialComments === undefined) {
            return;
        }
        setComments(initialComments.allCommentsByMovieDBIdAndFavoriteType)
    }, [initialComments]);

    //refetch
    useEffect(() => {
        if (initialComments !== undefined) {
            refetch({
                movieDBId: movieId,
                favoriteType: FavoriteType.MOVIE
            }).then((e) => {
                setComments(e.data.allCommentsByMovieDBIdAndFavoriteType)
            })
        }
    }, [initialComments, movieId, refetch])

    function submitComment(data: any, e: any) {
        if (userDetails.userId === undefined || userDetails.userId === null || movieDetails === undefined) {
            history.push('/users/login');
            return;
        }

        createComment({
            variables: {
                userId: userDetails.userId,
                movieDBId: movieDetails.id,
                favoriteType: FavoriteType.MOVIE,
                title: data.title,
                description: data.description
            }
        }).then((resp) => {
            e.target.reset();
            if (resp.data === null || resp.data === undefined) {
                return;
            }
            // @ts-ignore
            setComments((comments) => [resp.data.createComment, ...comments])

        })
    }

    function handleDeleteComment(e: MouseEvent) {
        const commentId = parseInt(e.currentTarget.id);
        deleteComment({
            variables: {
                id: commentId
            }
        }).then(() => {
            setComments((comments) => comments?.filter(c => c.commentId !== commentId))
        });
    }

    function handleUpdateComment(data: any, e: BaseSyntheticEvent) {
        console.log('tuka sme');
        console.log(data);
        // @ts-ignore
        const commentId = parseInt(e.nativeEvent.submitter.id);
        updateComment({
            variables: {
                commentId: commentId,
                title: data.title,
                description: data.description
            }
        }).then((e) => {
            console.log(e.data?.updateComment);
            if (comments === undefined) {
                return;
            }
            const newState = [...comments]
            let index;
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].commentId === e.data?.updateComment.commentId) {
                    index = i;
                    break;
                }
            }
            // @ts-ignore
            newState[index] = e.data?.updateComment;
            setComments(newState);
        });
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
            <ScrollAnimation animateIn={'fadeInDown'}>
                <CommentSubmitForm submitComment={submitComment} loading={createCommentLoading}/>
            </ScrollAnimation>
            <ScrollAnimation animateIn={'fadeInUp'}>
                <CommentList comments={comments}
                             editComment={handleUpdateComment}
                             deleteComment={handleDeleteComment}
                             deleteLoading={deleteCommentLoading}
                             updateLoading={updateCommentLoading}
                             loading={initialCommentsLoading}
                             userId={userDetails.userId}/>
            </ScrollAnimation>
        </>
    )
}

export {MovieDetailsController}
