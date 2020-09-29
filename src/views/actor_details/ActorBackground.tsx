import React, {useEffect, useState} from "react";
import {ActorDetails} from "../../services/the_movie_db/ActorService";
import {Card, CardMedia, Typography} from "@material-ui/core";

interface Props {
    actorDetails?: ActorDetails
}

function ActorBackground(props: Props) {
    const [visible, setVisible] = useState<boolean>(true)
    useEffect(() => {
        setVisible(false)
    }, []);

    const imageBasePath = 'https://image.tmdb.org/t/p/original';

    return (
        <>
            {/*input is here to fix autofocus bug*/}
            <input type="text" autoFocus={true} style={{display: (visible) ? 'block' : 'none'}}/>
            <Card elevation={8} className={'mt-2'}>
                <CardMedia
                           id={`${props.actorDetails?.id}`}
                           style={{height: 1110}}
                           image={imageBasePath + props.actorDetails?.profile_path}
                >
                    <div className={'movieDetailsTextProps'}>
                        <Typography variant="h4">
                            {props.actorDetails?.name}
                        </Typography>
                    </div>
                </CardMedia>
            </Card>
        </>
    )
}

export {ActorBackground}
