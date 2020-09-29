import React from "react";
import {ActorDetails} from "../../services/the_movie_db/ActorService";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";

interface Props {
    actorDetails?: ActorDetails
}

function ActorDescription(props: Props) {
    return (
        <>
            <Card elevation={10} className={'mt-2'}>
                <CardHeader title={props.actorDetails?.name}
                />
                <CardContent>
                    <Typography variant={'h6'}>
                        Biography
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {props.actorDetails?.biography}
                    </Typography>
                    <Typography variant={'h6'}>
                        Birthday
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {formatDate(props.actorDetails?.birthday)}
                    </Typography>
                    <Typography variant={'h6'}>
                        Place of birth
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {props.actorDetails?.place_of_birth}
                    </Typography>
                    <Typography variant={'h6'}>
                        Also Known As
                    </Typography>
                    <Typography gutterBottom={true} color="textSecondary">
                        {props.actorDetails?.also_known_as.join(", ")}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export {ActorDescription}
