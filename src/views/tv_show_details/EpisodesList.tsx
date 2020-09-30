import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {SeasonDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";


interface Props {
    seasonNumber: number
    tvShowId?: number
}

function EpisodesList(props: Props) {
    const [open, setOpen] = useState(false);
    const [seasonDetails, setSeasonDetails] = useState<SeasonDetails>();
    useEffect(() => {
        if (props.tvShowId !== undefined) {
            TvShowsService.getSeasonDetails(props.tvShowId, props.seasonNumber).then((e) => {
                setSeasonDetails(e.data)
            });
        }
    }, [props.tvShowId, props.seasonNumber])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button startIcon={<FormatListNumberedIcon/>}
                    onClick={handleClickOpen}
                    size="large">
                View Episodes List
            </Button>
            <Dialog
                style={{minWidth: '600px'}}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title">{`${seasonDetails?.name} - ${seasonDetails?.episodes.length} episodes`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <List component="nav" aria-label="main mailbox folders">
                            {seasonDetails?.episodes.map(e => {
                                return <>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${e.episode_number} : ${e.name} - ${formatDate(e.air_date)}`}/>
                                    </ListItem>
                                    <Divider/>
                                </>

                            })}
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="large">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export {EpisodesList}
