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
    updateAuthorityLoading: boolean
    authorities?: Authority[],
    currentAuthority?: string
}

function AdminEditAuthority(props: Props) {
    const {handleSubmit, control} = useForm({});
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
                                <FormControl
                                    fullWidth={true}
                                    required={true}>
                                    <InputLabel>Authority</InputLabel>
                                    <Controller name="authorityId"
                                                rules={{required: "this is required"}}
                                                control={control}
                                                defaultValue={2}
                                                as={
                                                    <Select
                                                    >
                                                        {props.authorities?.filter(a => a.authority !== props.currentAuthority)
                                                            .map(a => <MenuItem
                                                                value={a.authorityId}>{a.authority}</MenuItem>)}
                                                    </Select>}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button type={'submit'}
                                fullWidth={true}
                                variant="contained"
                                color="secondary"
                                disabled={props.loading || props.updateAuthorityLoading}>
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
