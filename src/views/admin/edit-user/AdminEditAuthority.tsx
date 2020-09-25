import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Controller, useForm} from "react-hook-form";
import {Authority} from "../../../config/apolo/queries/UserQueries";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

interface Props {
    editAuthority: Function,
    loading: boolean,
    authorities?: Authority[]
    updateAuthorityLoading: boolean
}

function AdminEditAuthority(props: Props) {
    const {register, handleSubmit, errors, getValues, control} = useForm({});
    return (
        <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>Edit this Users Authority</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit(data => props.editAuthority(data))} style={{width: '100%'}}>
                        <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                            <Grid item>
                                <PeopleAltIcon/>
                            </Grid>
                            <Grid item xs={10}>
                                <Controller
                                    rules={{required: true}}
                                    control={control}
                                    defaultValue={1}
                                    name={'authorityId'}
                                    as={
                                        <FormControl
                                            fullWidth={true}
                                            required={true}>
                                            <InputLabel>Authority</InputLabel>
                                            <Select
                                                defaultValue={2}
                                            >
                                                {props.authorities?.map(a => <MenuItem
                                                        value={a.authorityId}>{a.authority}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    }>
                                </Controller>
                            </Grid>
                        </Grid>
                        <Button type={'submit'}
                                fullWidth={true}
                                variant="contained"
                                color="secondary"
                                disabled={props.loading}>
                            Change authority
                            {props.loading || props.updateAuthorityLoading ?
                                <CircularProgress size={20} color={'secondary'}/> : ''}
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {AdminEditAuthority}
