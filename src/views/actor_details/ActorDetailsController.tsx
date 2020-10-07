import React, {BaseSyntheticEvent, MouseEvent, useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import {ActorDetails, ActorMovieOrTvCreditsResponse, ActorService} from "../../services/the_movie_db/ActorService";
import {PageLoading} from "../shered/PageLoading";
import {ActorBackground} from "./ActorBackground";
import {Grid, Typography} from "@material-ui/core";
import {ActorDescription} from "./ActorDescription";
import {ActorMovieTvShowCarousel} from "./ActorMovieTvShowCarousel";
import ScrollAnimation from "react-animate-on-scroll";
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

function ActorDetailsController() {
    const history = useHistory();
    const userDetails = useSelector((state: ReduxState) => state.userDetails);
    const {actorId} = useParams();
    const [actorDetails, setActorDetails] = useState<ActorDetails>();
    const [actorMovieCredits, setActorMovieCredits] = useState<ActorMovieOrTvCreditsResponse>();
    const [actorTvCredits, setActorTvCredits] = useState<ActorMovieOrTvCreditsResponse>();
    const [comments, setComments] = useState<CommentResp[]>();
    const [createComment, {loading: createCommentLoading}] = useMutation<CreateCommentResp, CreateCommentVars>(CREATE_COMMENT);
    const [updateComment, {loading: updateCommentLoading}] = useMutation<UpdateCommentResp, UpdateCommentVars>(UPDATE_COMMENT);
    const [deleteComment, {loading: deleteCommentLoading}] = useMutation<Dummy, DeleteCommentVars>(DELETE_COMMENT);
    const {data: initialComments, loading: initialCommentsLoading, refetch} = useQuery<GetAllCommentsByMovieDBIdResp, GetAllCommentsByMovieDBIdVars>(GET_ALL_COMMENTS_BY_MOVIE_DB_ID, {
        variables: {
            movieDBId: actorId,
            favoriteType: FavoriteType.ACTOR
        }
    });
    useEffect(() => {
        ActorService.getDetails(actorId).then((e) => {
            setActorDetails(e.data);
        });
        ActorService.getActorMovieCredits(actorId).then((e) => {
            setActorMovieCredits(e.data);
        });
        ActorService.getActorTvCredits(actorId).then((e) => {
            setActorTvCredits(e.data);
        });
    }, [actorId])

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
                movieDBId: actorId,
                favoriteType: FavoriteType.ACTOR
            }).then((e) => {
                setComments(e.data.allCommentsByMovieDBIdAndFavoriteType)
            })
        }
    }, [initialComments, actorId, refetch])

    function submitComment(data: any, e: any) {
        if (userDetails.userId === undefined || userDetails.userId === null || actorDetails === undefined) {
            history.push('/users/login');
            return;
        }

        createComment({
            variables: {
                userId: userDetails.userId,
                movieDBId: actorDetails.id,
                favoriteType: FavoriteType.ACTOR,
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
            <PageLoading
                loading={actorDetails === undefined || actorTvCredits === undefined || actorMovieCredits === undefined}
            />
            <Grid container={true} justify={'center'} spacing={1}>
                <Grid item={true} xs={12} md={6}>
                    <ScrollAnimation animateIn={'fadeInLeft'}>
                        <ActorBackground actorDetails={actorDetails}/>
                    </ScrollAnimation>
                </Grid>
                <Grid item={true} xs={12} md={6}>

                    <ScrollAnimation animateIn={'fadeInRight'}>
                        <Typography align={'center'} variant={'h4'} className={'mt-2'}>
                            Movies know for
                        </Typography>
                        <ActorMovieTvShowCarousel tvOrMovie={actorMovieCredits?.cast}/>
                        <Typography align={'center'} variant={'h4'} className={'mt-2'}>
                            TV Shows known for
                        </Typography>
                        <ActorMovieTvShowCarousel tvOrMovie={actorTvCredits?.cast}/>
                    </ScrollAnimation>
                </Grid>
                <Grid item={true} xs={12} md={11}>
                    <ScrollAnimation animateIn={'fadeInUp'}>
                        <ActorDescription actorDetails={actorDetails}/>
                    </ScrollAnimation>
                </Grid>
            </Grid>
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

export {ActorDetailsController}
