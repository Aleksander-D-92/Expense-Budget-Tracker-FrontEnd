import React, {MouseEvent, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useMutation, useQuery} from "@apollo/client";
import {Authority, UserByIdQueryVars, UserDetails} from "../../../config/apolo/queries/UserQueries";
import {AdminEditUserResp, USER_DETAILS_AND_AUTHORITIES} from "../../../config/apolo/queries/AdminQueries";
import {AdminLockAccount} from "./AdminLockAccount";
import {AdminEditAuthority} from "./AdminEditAuthority";
import {Avatar, Card, CardHeader, Grid, List, ListItemText} from "@material-ui/core";
import {capitalizeString, formatDate} from "../../../shared/utils/functions";
import {
    ADMIN_UPDATE_ACCOUNT_LOCK,
    ADMIN_UPDATE_AUTHORITY,
    AdminUpdateAccountLockVars, AdminUpdateAuthorityVars
} from "../../../config/apolo/mutations/AdminMutations";
import {Dummy} from "../../../config/apolo/ApoloConfig";

function AdminEditUserController() {
    const {userId} = useParams();
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [authorities, setAuthorities] = useState<Authority[]>();
    const [updateAccountLock, {loading: updateAccountLockLoading}] = useMutation<Dummy, AdminUpdateAccountLockVars>(ADMIN_UPDATE_ACCOUNT_LOCK);
    const [updateAuthority, {loading: updateAuthorityLoading}] = useMutation<Dummy, AdminUpdateAuthorityVars>(ADMIN_UPDATE_AUTHORITY);
    const {data, loading} = useQuery<AdminEditUserResp, UserByIdQueryVars>(USER_DETAILS_AND_AUTHORITIES, {
        variables: {
            id: userId
        }
    });

    useEffect(() => {
        setUserDetails(data?.userById)
        setAuthorities(data?.allAuthorities)
    }, [data])

    function lockAccount(e: MouseEvent<HTMLButtonElement>) {
        let accountNonLock = false;
        switch (e.currentTarget.name) {
            case 'lock':
                accountNonLock = false;
                break;
            case 'unlock':
                accountNonLock = true;
                break;
        }
        const userId = userDetails?.userId;
        updateAccountLock({
            variables: {
                userId: (userId !== undefined) ? userId : -1,
                accountNonLocked: accountNonLock,
            }
        }).then(() => {
            const {...newState} = userDetails;
            newState.accountNonLocked = accountNonLock;
            setUserDetails(newState);
        });
    }

    function editAuthority() {

    }

    return (
        <>
            <Grid container justify="center">
                <Grid xs={11} md={6} className={'mt-4'}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe">
                                    {userDetails?.username.slice(0, 1).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                <List component="nav" aria-label="main mailbox folders" style={{fontSize: '5'}}>
                                    <ListItemText
                                        primary={`Account Non Locked: ${userDetails?.accountNonLocked ? 'Non-Locked' : 'Locked'}`}/>
                                    <ListItemText
                                        primary={`Authority: ${userDetails?.authorities[0].authority}`}/>
                                </List>
                            }
                            title={capitalizeString(userDetails?.username)}
                            subheader={`Registered on ${formatDate(userDetails?.registrationDate)}`}
                        >
                        </CardHeader>
                        <AdminLockAccount lockAccount={lockAccount}
                                          loading={loading}
                                          updateAccountLockLoading={updateAccountLockLoading}
                                          accountNonLocked={userDetails?.accountNonLocked}/>

                        <AdminEditAuthority editAuthority={editAuthority}
                                            loading={loading}
                                            updateAuthorityLoading={updateAuthorityLoading}
                                            authorities={authorities}
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {AdminEditUserController}
