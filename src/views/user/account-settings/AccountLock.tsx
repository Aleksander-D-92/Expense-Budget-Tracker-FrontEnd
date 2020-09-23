import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Grid, TextField, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useForm} from "react-hook-form";
import LockIcon from "@material-ui/icons/Lock";

interface Props {
    lockAccount: Function
}

function AccountLock(props: Props) {
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
                    <Typography>Lock your Account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit(data => props.lockAccount(data))} style={{width: '100%'}}>
                        <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth={true}
                                    label="Password"
                                    placeholder={'Enter your password to confirm account lock'}
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
                        <Button type={'submit'}
                                variant="contained"
                                color="secondary">
                            Lock your account
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {AccountLock}
