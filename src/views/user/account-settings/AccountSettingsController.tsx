import React from "react";
import {Avatar, Card, CardHeader, createStyles, Grid, Theme} from "@material-ui/core";
import {ChangePassword} from "./ChangePassword";
import {AccountLock} from "./AccountLock";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../config/redux/ReduxStore";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {useMutation} from "@apollo/client";
import {UPDATE_ACCOUNT_LOCK, UPDATE_PASSWORD} from "../../../config/apolo/queries/UserQueries";
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
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
    const [updatePassword] = useMutation(UPDATE_PASSWORD);
    const [updateAccountLock] = useMutation(UPDATE_ACCOUNT_LOCK);

    function changePassword(data: any) {
        updatePassword({
            variables: {
                userId: id,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }
        }).then(() => {
            history.push("/users/logout")
        }).catch(() => {
            toast.error("Invalid Password", {
                position: 'bottom-right'
            });
        })
    }

    function lockAccount(data: any) {
        updateAccountLock({
            variables: {
                userId: id,
                $password: data.password
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
                        <ChangePassword changePassword={changePassword}/>
                        <AccountLock lockAccount={lockAccount}/>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer/>
        </>
    )
}

export {AccountSettingsController}
