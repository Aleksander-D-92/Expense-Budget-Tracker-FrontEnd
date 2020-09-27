import React, {useEffect} from "react";
import {Avatar, Card, CardHeader, createStyles, Grid, LinearProgress} from "@material-ui/core";
import {ChangePassword} from "./ChangePassword";
import {AccountLock} from "./AccountLock";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../config/redux/ReduxStore";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {useLazyQuery, useMutation} from "@apollo/client";
import {USER_BY_ID, UserByIdQueryResult, UserByIdQueryVars} from "../../../services/apollo/queries/UserQueries";
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {
    UPDATE_ACCOUNT_LOCK,
    UPDATE_PASSWORD,
    UpdateAccountLockVars,
    UpdatePasswordVars
} from "../../../services/apollo/mutations/UserMutations";
import {formatDate} from "../../../shared/utils/functions";
import {Dummy} from "../../../services/apollo/ApoloConfig";

const useStyles = makeStyles(
    createStyles({
        root: {},
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

function AccountSettingsController() {
    const classes = useStyles();
    const history = useHistory();
    const state = useSelector((state: ReduxState) => state)
    const id = state.userDetails.userId;
    const [updatePassword, {loading: updatePasswordLoading}] = useMutation<Dummy, UpdatePasswordVars>(UPDATE_PASSWORD);
    const [updateAccountLock, {loading: updateAccountLockLoading}] = useMutation<Dummy, UpdateAccountLockVars>(UPDATE_ACCOUNT_LOCK);
    const [getUserDetails, {loading: getUserDetailsLoading, data}] = useLazyQuery<UserByIdQueryResult, UserByIdQueryVars>(USER_BY_ID);
    useEffect(() => {
        getUserDetails({
            variables: {id: id}
        });
    }, [getUserDetails, id])

    const formatAction = (authority: string | undefined) => {
        switch (authority) {
            case 'ROLE_ADMIN':
                return 'Admin';
            case 'ROLE_USER_FREE':
                return 'Free Account';
            case 'ROLE_USER_PAID':
                return 'Paid Account';
            default:
                return '';
        }
    }

    function changePassword(formData: any) {
        updatePassword({
            variables: {
                userId: id,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            }
        }).then(() => {
            history.push("/users/logout")
        }).catch(() => {
            toast.error("Invalid Password", {
                position: 'bottom-right'
            });
        })
    }

    function lockAccount(formData: any) {
        updateAccountLock({
            variables: {
                userId: id,
                password: formData.password
            }
        }).then(() => {
            history.push("/users/logout")
        }).catch(() => {
            toast.error("Invalid Password", {
                position: 'bottom-right'
            });
        })
    }

    return (
        <>
            <Grid container justify="center">
                <Grid xs={11} md={6} className={'mt-4'}>
                    <Card elevation={8}>
                        {getUserDetailsLoading ? <LinearProgress/> : ''}
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {(state.userDetails.username !== undefined) ? state.userDetails.username.charAt(0).toUpperCase() : 'A'}
                                </Avatar>
                            }
                            title="Account settings"
                            subheader={`Registered: ${formatDate(data?.userById.registrationDate)}`}
                            action={formatAction(data?.userById.authorities[0].authority)}
                        />
                        <ChangePassword changePassword={changePassword}
                                        passwordLoading={updatePasswordLoading}
                                        accountLockLoading={updateAccountLockLoading}/>
                        <AccountLock lockAccount={lockAccount}
                                     accountLockLoading={updateAccountLockLoading}
                                     passwordLoading={updatePasswordLoading}/>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer/>
        </>
    )
}

export {AccountSettingsController}
