import React, {MouseEvent, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

interface Props {
    lockAccount: Function,
    loading: boolean,
    accountNonLocked?: boolean
    updateAccountLockLoading: boolean
}

function AdminLockAccount(props: Props) {
    return (
        <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>Lock or unlock this users account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form style={{width: '100%'}}>
                        <Button variant="contained"
                                color="primary"
                                className={'mb-2'}
                                fullWidth={true}
                                disabled={!!props.accountNonLocked || props.updateAccountLockLoading || props.accountNonLocked === undefined}
                                startIcon={<LockIcon/>}
                                name={'unlock'}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => props.lockAccount(e)}>
                            Unlock
                            {props.updateAccountLockLoading || props.accountNonLocked === undefined ? <CircularProgress size={20} color={'primary'}/> : ''}
                        </Button>
                        <Button variant="contained"
                                color="secondary"
                                fullWidth={true}
                                disabled={!props.accountNonLocked || props.updateAccountLockLoading || props.accountNonLocked === undefined}
                                startIcon={<LockOpenIcon/>}
                                name={'lock'}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => props.lockAccount(e)}>
                            Lock
                            {props.updateAccountLockLoading || props.accountNonLocked === undefined ? <CircularProgress size={20} color={'secondary'}/> : ''}
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {AdminLockAccount}
