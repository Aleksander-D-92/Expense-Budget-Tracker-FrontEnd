import React, {useEffect, useState} from "react";
import {AllUsersTable} from "./AllUsersTable";
import {ALL_USERS, AllUsersQuery, UserDetails} from "../../config/apolo/queries/UserQueries";
import {useQuery} from "@apollo/client";
import {cloneDeep} from 'lodash';


function AllUsersController() {
    const {loading, error, data} = useQuery<AllUsersQuery>(ALL_USERS);
    const [allUsers, setAllUsers] = useState<UserDetails[]>();
    useEffect(() => {
        setAllUsers(cloneDeep(data?.allUsers));
    }, [data])
    return (
        <>
            <AllUsersTable users={allUsers}
                           loading={loading}/>
        </>
    )
}

export {AllUsersController}
