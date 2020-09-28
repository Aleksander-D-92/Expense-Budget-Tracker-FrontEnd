import React from "react";
import {Backdrop, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface Props {
    loading: boolean
}

function PageLoading(props: Props) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }),
    );
    const classes = useStyles();
    return (
        <>
            <Backdrop open={props.loading} className={classes.backdrop}>
                <CircularProgress color="secondary" size={100} thickness={6}/>
            </Backdrop>
        </>
    )
}

export {PageLoading}
