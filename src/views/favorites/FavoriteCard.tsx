import React, {CSSProperties, useEffect, useState} from "react";
import {Card, CircularProgress, Grid, Typography} from "@material-ui/core";
import StarsIcon from '@material-ui/icons/Stars';

interface Props {
    label: string,
    count?: number,
}

function FavoriteCard(props: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const favIconStyles = {
        fontSize: '50px',
        position: 'relative',
        top: '15px',
        marginRight: '150px'
    } as CSSProperties

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    return (
        <>
            <Grid item={true} xs={11} md={3}>
                <Card elevation={10} className={'mt-3'} style={{minHeight: '100px'}}>
                    {loading ? <CircularProgress className={'ml-5 mt-4'} thickness={10} size={40}/>
                        :
                        <Typography variant="subtitle1" gutterBottom style={{fontSize: '20px'}} className={'mt-3 mb-5'}>
                            <StarsIcon style={favIconStyles} className={' ml-1'}/>Favorite {props.label}: {props.count}
                        </Typography>}
                </Card>
            </Grid>
        </>
    )
}

export {FavoriteCard}
