import React, {MouseEvent, useEffect} from "react";
import {CommentResp} from "../../services/apollo/queries/CommentQueries";
import {
    Avatar, Button,
    createStyles,
    Divider,
    Grid, LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange} from "@material-ui/core/colors";
import {formatDate} from "../../shared/utils/functions";
import {CommentEdit} from "./CommentEdit";

interface Props {
    comments?: CommentResp[],
    deleteComment: Function,
    editComment: Function,
    loading: boolean,
    userId: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: theme.palette.primary.main,
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

function CommentList(props: Props) {
    const classes = useStyles();
    useEffect(() => {
        console.log(props.comments)
        console.log(props.userId)
    }, [props.comments, props.userId])
    return (
        <>
            <Grid container={true} justify={'center'}>
                <Grid item={true} xs={12}>
                    <Paper elevation={10} className={'ml-4 mr-3 mt-4'}>
                        {props.loading && <LinearProgress color="secondary" style={{height: '10px'}}/>}
                        <List className={classes.root}>
                            {props.comments?.map(comment =>
                                <>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                className={classes.orange}>{comment.submitter.username.slice(0, 1).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={comment.title}
                                            secondary={
                                                <>
                                                    <Typography
                                                        className={'mt-2 mb-4'}
                                                        component="span"
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        submitted: {formatDate(comment.creationDate)}
                                                    </Typography>
                                                    <Typography variant={'subtitle1'} color={'textPrimary'}>
                                                        {comment.description}
                                                    </Typography>
                                                </>
                                            }
                                        >
                                        </ListItemText>
                                        {props.userId == comment.submitter.userId &&
                                        <>
                                            {/*edit comment modal*/}
                                            <CommentEdit
                                                commentId={comment.commentId}
                                                titleDefaultValue={comment.title}
                                                descriptionDefaultValue={comment.description}
                                                editComment={props.editComment}/>

                                            <Button className={'ml-2'}
                                                    variant="contained"
                                                    color="secondary"
                                                    id={comment.commentId.toString()}
                                                    onClick={(e: MouseEvent) => props.deleteComment(e)}>
                                                Delete
                                            </Button>
                                        </>}
                                    </ListItem>
                                    <Divider variant="inset" component="li"/>
                                </>)
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export {CommentList}
