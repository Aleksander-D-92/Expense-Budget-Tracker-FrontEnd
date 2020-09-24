import React from "react";
import {useParams} from 'react-router-dom';
import {useQuery} from "@apollo/client";
import {USER_BY_ID, UserByIdQuery, UserByIdQueryVars} from "../../config/apolo/queries/UserQueries";

function AdminEditUser() {
    const {userId} = useParams();
    const {data: userDetails, loading: userDetailsLoading} = useQuery<UserByIdQuery, UserByIdQueryVars>(USER_BY_ID, {
        variables: {
            id: userId
        }
    });
    return (
        <>
            div
        </>
    )
}

export {AdminEditUser}
