import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MediaType} from "../../services/the_movie_db/MultiSearchService";
import {Tooltip} from "@material-ui/core";
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
            <Tooltip title={"Click to View Details"}
                     placement={'top'}
                     arrow={true}>
                <Link to={(routeName === undefined) ? '' : routeName}
                      className={'detailsLink'}>
                    {props.value}
                </Link>
            </Tooltip>
        </>
    )
}

export {LinkToDetails}
