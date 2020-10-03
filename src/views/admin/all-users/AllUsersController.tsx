import React, {useEffect, useState} from "react";
import {AllUsersTable} from "./AllUsersTable";
import {ALL_USERS, AllUsersQueryResp, UserDetails} from "../../../services/apollo/queries/UserQueries";
import {useQuery} from "@apollo/client";
import {cloneDeep} from 'lodash';
import {Grid, Paper} from "@material-ui/core";


function AllUsersController() {
    const {loading, data, refetch} = useQuery<AllUsersQueryResp>(ALL_USERS);
    const [allUsers, setAllUsers] = useState<UserDetails[]>();
    useEffect(() => {
        setAllUsers(cloneDeep(data?.allUsers));
    }, [data])

    useEffect(() => {
        if (data !== undefined) {
            refetch().then((e) => {
                setAllUsers(cloneDeep(e.data.allUsers))
            });
        }
    }, [])
    return (
        <>
            <Grid container={true} justify={'center'}>
                <Grid item={true} xs={11} className={'mt-2'}>
                    <Paper elevation={10}>
                        <AllUsersTable users={allUsers}
                                       loading={loading}/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export {AllUsersController}
