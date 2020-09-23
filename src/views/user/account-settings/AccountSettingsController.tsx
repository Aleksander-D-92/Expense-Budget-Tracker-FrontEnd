import React, {useEffect} from "react";
import {Avatar, Card, CardHeader, createStyles, Grid, Theme} from "@material-ui/core";
import {ChangePassword} from "./ChangePassword";
import {AccountLock} from "./AccountLock";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../config/redux/ReduxStore";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {useLazyQuery, useMutation} from "@apollo/client";
import {
    USER_BY_ID,
    UserByIdQuery, UserByIdQueryVars
} from "../../../config/apolo/queries/UserQueries";
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {
    UPDATE_ACCOUNT_LOCK,
    UPDATE_PASSWORD,
    UpdateAccountLockVars,
    UpdatePasswordVars
} from "../../../config/apolo/queries/UserMutations";
import {Dummy} from "../../../config/apolo/queries/Shared";

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
    const [getUserDetails, {loading: getUserDetailsLoading, data}] = useLazyQuery<UserByIdQuery, UserByIdQueryVars>(USER_BY_ID);
    useEffect(() => {
        getUserDetails({
            variables: {id: id}
        });
        console.log(data?.userById.authorities);
    }, [data, getUserDetails, id])

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
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {(state.userDetails.username !== undefined) ? state.userDetails.username.charAt(0).toUpperCase() : 'A'}
                                </Avatar>
                            }
                            title="Account settings"
                            subheader="Registered: September 14, 2016"
                        />
                        <ChangePassword changePassword={changePassword}
                                        loading={updatePasswordLoading}/>
                        <AccountLock lockAccount={lockAccount}
                                     loading={updateAccountLockLoading}/>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer/>
        </>
    )
}

export {AccountSettingsController}
