import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {SeasonDetails, TvShowsService} from "../../services/the_movie_db/TvShowsService";


interface Props {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function EpisodesModal() {
    const [open, setOpen] = useState(false);
    const [seasonDetails, setSeasonDetails] = useState<SeasonDetails>();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        TvShowsService.getSeasonDetails(1, 1).then((e) => {
            setSeasonDetails(e.data);
        });
    }, [open])
    return (
        <>
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>{"All episodes for this season"}</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export {EpisodesModal}
