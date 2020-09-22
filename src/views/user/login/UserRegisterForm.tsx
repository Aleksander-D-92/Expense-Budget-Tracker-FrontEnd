import React from "react";
import {Button, Card, CardContent, CardHeader, Grid, IconButton, TextField} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useForm} from "react-hook-form";


interface Props {

}


function UserRegisterForm(props: Props) {
    const {register, handleSubmit, errors, getValues} = useForm({
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(errors);
        console.log(data);
    }

    return (
        <>
            <Grid container justify="center">
                <Grid xs={11} md={6} className={'mt-4'}>
                    <Card>
                        <CardHeader title={'Registration form'}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }/>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="username"
                                    placeholder={'enter your username'}
                                    name={'username'}
                                    inputRef={register({
                                        required: true,
                                        pattern: new RegExp('^[a-zA-Z0-9]{5,20}$')
                                    })}
                                    error={errors.username}
                                    helperText={errors.username ? 'Between 5 and 20 characters, no spacial symbols' : ''}
                                />
                                <TextField
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
                                <TextField
                                    label="Confirm Password"
                                    placeholder={'confirm your password'}
                                    type={'password'}
                                    name={'confirmPassword'}
                                    inputRef={register({
                                        required: true,
                                        validate: {passwordMatches: value => (value === getValues().password)}
                                    })}
                                    error={errors.confirmPassword}
                                    helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
                                />
                                <Button type={'submit'} variant="contained" color="secondary">
                                    Secondary
                                </Button>
                            </form>
                        </CardContent>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle/>
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="With a grid"/>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {UserRegisterForm}
