import React, {MouseEvent} from "react";
import {Button, Card, CardHeader, CircularProgress, Grid, Tooltip} from "@material-ui/core";
import {ADMIN_TOOLTIP, FREE_ACCOUNT_TOOLTIP, PAID_ACCOUNT_TOOLTIP} from "./variables";

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
                        title="Demo Login"
                        subheader="Allows you to log in with a demo account with a some test data"
                    />
                    <Tooltip title={PAID_ACCOUNT_TOOLTIP} placement={'top'}>
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
                    </Tooltip>

                    <Tooltip title={FREE_ACCOUNT_TOOLTIP} placement={'top'}>
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
                    </Tooltip>

                    <Tooltip title={ADMIN_TOOLTIP} placement={'top'}>
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
                    </Tooltip>

                </Card>
            </Grid>
        </>
    )
}

export {DemoLogin}
