import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox, CircularProgress,
    FormControlLabel,
    Grid,
    IconButton,
    TextField
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import {useForm} from "react-hook-form";


interface Props {
    handleLogin: Function,
    loading: boolean
}

function UserLoginForm(props: Props) {
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });
    return (
        <>
            <Grid container justify="center">
                <Grid xs={11} md={4} className={'mt-4'}>
                    <Card>
                        <CardHeader title={'Login form'}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }/>
                        <CardContent>
                            <form onSubmit={handleSubmit(data => props.handleLogin(data))}>
                                <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                                    <Grid item>
                                        <AccountCircle/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth={true}
                                            label="username"
                                            placeholder={'enter your username'}
                                            name={'username'}
                                            inputRef={register({
                                                required: true,
                                                pattern: new RegExp('^[a-zA-Z0-9_]{5,20}$')
                                            })}
                                            error={errors.username}
                                            helperText={errors.username ? 'Between 5 and 20 characters, no spacial symbols except "_"' : ''}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                                    <Grid item>
                                        <LockIcon/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth={true}
                                            label="Password"
                                            placeholder={'chose a password'}
                                            type={'password'}
                                            name={'password'}
                                            inputRef={register({
                                                required: true,
                                                pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
                                            })}
                                            error={errors.password}
                                            helperText={errors.password ? 'Minimum six characters, at least one letter and one number:' : ''}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    name="rememberMe"
                                                    inputRef={register}
                                                />
                                            }
                                            label="Remember Me"
                                        />
                                    </Grid>
                                </Grid>
                                <Button type={'submit'}
                                        variant="contained"
                                        color="primary"
                                        disabled={props.loading}>
                                    Login
                                    {props.loading ? <CircularProgress size={20} color={'primary'}/> : ''}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {UserLoginForm}
