import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useQuery} from "@apollo/client";
import {Authority, UserByIdQueryVars, UserDetails} from "../../../config/apolo/queries/UserQueries";
import {AdminEditUserResp, USER_DETAILS_AND_AUTHORITIES} from "../../../config/apolo/queries/AdminQueries";
import {AdminLockAccount} from "./AdminLockAccount";
import {AdminEditAuthority} from "./AdminEditAuthority";

function AdminEditUser() {
    const {userId} = useParams();
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [authorities, setAuthorities] = useState<Authority[]>();
    const {data, loading} = useQuery<AdminEditUserResp, UserByIdQueryVars>(USER_DETAILS_AND_AUTHORITIES, {
        variables: {
            id: userId
        }
    });

    function lockAccount() {

    }

    function editAuthority() {

    }

    useEffect(() => {
        setUserDetails(data?.userById)
        setAuthorities(data?.allAuthorities)
    }, [data])
    return (
        <>
            <AdminLockAccount lockAccount={lockAccount}/>
            <AdminEditAuthority editAuthority={editAuthority}/>
        </>
    )
}

export {AdminEditUser}
