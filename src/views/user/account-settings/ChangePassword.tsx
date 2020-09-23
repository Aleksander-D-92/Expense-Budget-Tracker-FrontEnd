import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useForm} from "react-hook-form";
import LockIcon from "@material-ui/icons/Lock";

interface Props {
    changePassword: Function,
    loading: boolean
}

function ChangePassword(props: Props) {
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        }
    });
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>Change your password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit(data => props.changePassword(data))} style={{width: '100%'}}>
                        <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth={true}
                                    label="Old password"
                                    placeholder={'enter your old password'}
                                    type={'password'}
                                    name={'oldPassword'}
                                    inputRef={register({
                                        required: true,
                                        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
                                    })}
                                    error={errors.oldPassword}
                                    helperText={errors.oldPassword ? 'Minimum six characters, at least one letter and one number:' : ''}
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
                                    label="New Password"
                                    placeholder={'enter your new password'}
                                    type={'password'}
                                    name={'newPassword'}
                                    inputRef={register({
                                        required: true,
                                        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
                                    })}
                                    error={errors.newPassword}
                                    helperText={errors.newPassword ? 'Minimum six characters, at least one letter and one number:' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Button type={'submit'}
                                variant="contained"
                                color="secondary"
                                disabled={props.loading}>
                            Change password
                            {props.loading ? <CircularProgress size={20} color={'secondary'}/> : ''}
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {ChangePassword}
