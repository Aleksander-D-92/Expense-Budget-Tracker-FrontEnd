import React, {MouseEvent, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useMutation, useQuery} from "@apollo/client";
import {Authority, UserByIdQueryVars, UserDetails} from "../../../services/apollo/queries/UserQueries";
import {AdminEditUserResp, USER_DETAILS_AND_AUTHORITIES} from "../../../services/apollo/queries/AdminQueries";
import {AdminLockAccount} from "./AdminLockAccount";
import {AdminEditAuthority} from "./AdminEditAuthority";
import {Avatar, Card, CardHeader, Grid, LinearProgress, List, ListItemText} from "@material-ui/core";
import {capitalizeString, formatDate} from "../../../shared/utils/functions";
import {
    ADMIN_UPDATE_ACCOUNT_LOCK,
    ADMIN_UPDATE_AUTHORITY,
    AdminUpdateAccountLockVars,
    AdminUpdateAuthorityVars
} from "../../../services/apollo/mutations/AdminMutations";
import {Dummy} from "../../../services/apollo/ApoloConfig";
import {cloneDeep} from 'lodash';


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
        setUserDetails(cloneDeep(data?.userById))
        setAuthorities(cloneDeep(data?.allAuthorities))
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

    function editAuthority(formData: any) {
        console.log(formData);
        if (formData.authorityId === userDetails?.authorities[0].authorityId) {
            return;
        }
        const userId = userDetails?.userId;
        const authorityId = formData.authorityId;
        updateAuthority({
            variables: {
                userId: (userId !== undefined) ? userId : -1,
                authorityId: authorityId,
            }
        }).then(() => {
            const {...newState} = userDetails;
            const newAuthority = authorities?.find(a => a.authorityId === formData.authorityId);
            if (newAuthority !== undefined) {
                newState.authorities[0] = newAuthority;
            }
            setUserDetails(newState);
        })
    }

    return (
        <>
            <Grid container justify="center">
                <Grid xs={11} md={6} className={'mt-4'}>
                    <LinearProgress hidden={!loading}/>
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
                                            currentAuthority={userDetails?.authorities[0].authority}
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
