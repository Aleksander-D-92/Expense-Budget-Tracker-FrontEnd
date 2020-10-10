import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MediaType} from "../../services/the_movie_db/MultiSearchService";
import {Tooltip, Typography} from "@material-ui/core";
import './css/DetailsLink.css'

interface Props {
    id: number
    value: string
    mediaType: MediaType
}

function LinkToDetails(props: Props) {
    const [routeName, setRouteName] = useState<string>();
    useEffect(() => {
        switch (props.mediaType) {
            case MediaType.movie:
                setRouteName(`/movies/${props.id}`)
                break;
            case MediaType.tv:
                setRouteName(`/tv-shows/${props.id}`)
                break;
            case MediaType.person:
                setRouteName(`/actors/${props.id}`)
                break;
            default:
                setRouteName('');
        }
    }, [props.id, props.mediaType])

    return (
        <>

            <Link to={(routeName === undefined) ? '' : routeName}
                  className={'detailsLink'}>
                <Tooltip title={"Click to View Details"}
                         placement={'top-start'}
                         arrow={true}>
                    <Typography color={'textPrimary'} variant={"h5"}>
                        {props.value}
                    </Typography>
                </Tooltip>
            </Link>

        </>
    )
}

export {LinkToDetails}
