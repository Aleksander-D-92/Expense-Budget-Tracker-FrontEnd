import React, {MouseEvent} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

interface Props {
    lockAccount: Function,
    loading: boolean,
    accountNonLocked?: boolean
}

function AdminLockAccount(props: Props) {
    return (
        <>
            <Accordion>
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
                                disabled={props.accountNonLocked ? true : false}
                                startIcon={<LockIcon/>}
                                name={'unlock'}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => props.lockAccount(e)}>
                            Unlock
                        </Button>
                        <Button variant="contained"
                                color="secondary"
                                fullWidth={true}
                                disabled={props.accountNonLocked ? false : true}
                                startIcon={<LockOpenIcon/>}
                                name={'lock'}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => props.lockAccount(e)}>
                            Lock
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {AdminLockAccount}
