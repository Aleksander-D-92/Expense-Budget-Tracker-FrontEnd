import React, {useEffect, useState} from "react";
import {Divider, Grid, Typography} from "@material-ui/core";

interface Props {
    text: string
}

function NoFavorite(props: Props) {
    return (
        <>
            <Grid container={true} justify={'center'} className={'mt-3 mb-3'}>
                <Grid item={true} xs={4}>
                    <Divider variant={'middle'} style={{height: '4px', backgroundColor: '#f50057'}}/>
                    <Typography variant={'h5'} align={'center'} color={'secondary'}>{props.text}</Typography>
                    <Divider variant={'middle'} style={{height: '4px', backgroundColor: '#f50057'}}/>
                </Grid>
            </Grid>
        </>
    )
}

export {NoFavorite}
