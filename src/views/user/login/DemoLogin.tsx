import React, {MouseEvent} from "react";
import {Button, Card, CardHeader, CircularProgress, Grid, IconButton} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Props {
    loading: boolean
    handleDemoLogin: Function
}

function DemoLogin(props: Props) {
    return (
        <>
            <Grid item={true} xs={11} md={4} className={'mt-4'}>
                <Card elevation={8}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Demo Login"
                        subheader="Allowes you to log in with a demo account with a lot of test data"
                    />
                    <Button variant="contained"
                            color="primary"
                            className={'mb-2'}
                            fullWidth={true}
                            name={'paid_login'}
                            disabled={props.loading}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => props.handleDemoLogin(e)}
                    >
                        Demo Paid Account
                        {props.loading ? <CircularProgress size={20} color={'primary'}/> : ''}
                    </Button>
                    <Button variant="contained"
                            className={'mb-2'}
                            color="primary"
                            fullWidth={true}
                            name={'free_login'}
                            disabled={props.loading}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => props.handleDemoLogin(e)}
                    >
                        Demo Free Account
                        {props.loading ? <CircularProgress size={20} color={'primary'}/> : ''}
                    </Button>
                    <Button variant="contained"
                            className={'mb-2'}
                            color="primary"
                            fullWidth={true}
                            name={'admin_login'}
                            disabled={props.loading}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => props.handleDemoLogin(e)}
                    >
                        Demo Admin
                        {props.loading ? <CircularProgress size={20} color={'primary'}/> : ''}
                    </Button>
                </Card>
            </Grid>
        </>
    )
}

export {DemoLogin}
