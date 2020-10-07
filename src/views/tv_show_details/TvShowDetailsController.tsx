import React, {BaseSyntheticEvent, MouseEvent, useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import {TVShowDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {MovieTvShowBackground} from "../shered/MovieTvShowBackground";
import {PageLoading} from "../shered/PageLoading";
import {Credits} from "../../services/the_movie_db/MovieService";
import {CastCarousel} from "../shered/CastCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {Typography} from "@material-ui/core";
import {SeasonCarousel} from "./SeasonCarousel";
import {TvShowDescription} from "./TvShowDescription";
import {useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";
import {
    CommentResp, GET_ALL_COMMENTS_BY_MOVIE_DB_ID,
    GetAllCommentsByMovieDBIdResp,
    GetAllCommentsByMovieDBIdVars
} from "../../services/apollo/queries/CommentQueries";
import {useMutation, useQuery} from "@apollo/client";
import {
    CREATE_COMMENT,
    CreateCommentResp,
    CreateCommentVars, DELETE_COMMENT, DeleteCommentVars, UPDATE_COMMENT,
    UpdateCommentResp, UpdateCommentVars
} from "../../services/apollo/mutations/CommentsMutations";
import {Dummy} from "../../services/apollo/ApoloConfig";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";
import {CommentSubmitForm} from "../comment/CommentSubmitForm";
import {CommentList} from "../comment/CommentList";

function TvShowDetailsController() {
    const history = useHistory();
    const userDetails = useSelector((state: ReduxState) => state.userDetails);
    const {tvShowId} = useParams();
    const [tvShowDetails, setTvShowDetails] = useState<TVShowDetails>();
    const [tvShowCredits, setTvShowCredits] = useState<Credits>();
    const [comments, setComments] = useState<CommentResp[]>();
    const [createComment, {loading: createCommentLoading}] = useMutation<CreateCommentResp, CreateCommentVars>(CREATE_COMMENT);
    const [updateComment, {loading: updateCommentLoading}] = useMutation<UpdateCommentResp, UpdateCommentVars>(UPDATE_COMMENT);
    const [deleteComment, {loading: deleteCommentLoading}] = useMutation<Dummy, DeleteCommentVars>(DELETE_COMMENT);
    const {data: initialComments, loading: initialCommentsLoading, refetch} = useQuery<GetAllCommentsByMovieDBIdResp, GetAllCommentsByMovieDBIdVars>(GET_ALL_COMMENTS_BY_MOVIE_DB_ID, {
        variables: {
            movieDBId: tvShowId,
            favoriteType: FavoriteType.TV
        }
    });
    useEffect(() => {
        TvShowsService.getDetails(tvShowId).then((e) => {
            setTvShowDetails(e.data);
        });
        TvShowsService.getCredits(tvShowId).then((e) => {
            setTvShowCredits(e.data);
        });
    }, [tvShowId])
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
                movieDBId: tvShowId,
                favoriteType: FavoriteType.TV
            }).then((e) => {
                setComments(e.data.allCommentsByMovieDBIdAndFavoriteType)
            })
        }
    }, [initialComments, tvShowId, refetch])

    function submitComment(data: any, e: any) {
        if (userDetails.userId === undefined || userDetails.userId === null || tvShowDetails === undefined) {
            history.push('/users/login');
            return;
        }

        createComment({
            variables: {
                userId: userDetails.userId,
                movieDBId: tvShowDetails.id,
                favoriteType: FavoriteType.TV,
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
        // @ts-ignore
        const commentId = parseInt(e.nativeEvent.submitter.id);
        updateComment({
            variables: {
                commentId: commentId,
                title: data.title,
                description: data.description
            }
        }).then((e) => {
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
            <PageLoading loading={tvShowDetails === undefined || tvShowCredits === undefined}/>
            <MovieTvShowBackground backdrop_path={tvShowDetails?.backdrop_path}
                                   poster_path={tvShowDetails?.poster_path}
                                   title={tvShowDetails?.name}
                                   genres={tvShowDetails?.genres}
                                   vote_average={tvShowDetails?.vote_average}/>
            <ScrollAnimation animateIn={'fadeInUp'}>
                <TvShowDescription tvShowDetails={tvShowDetails}/>
            </ScrollAnimation>
            <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                Seasons
            </Typography>
            <ScrollAnimation animateIn={'fadeInLeft'}>
                <SeasonCarousel seasons={tvShowDetails?.seasons} tvShowId={tvShowDetails?.id}/>
            </ScrollAnimation>
            <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                Cast
            </Typography>
            <ScrollAnimation animateIn={'fadeInRight'}>
                <CastCarousel cast={tvShowCredits?.cast}/>
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

export {TvShowDetailsController}
