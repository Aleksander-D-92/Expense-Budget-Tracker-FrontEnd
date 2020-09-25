import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useForm} from "react-hook-form";
import {Authority} from "../../../config/apolo/queries/UserQueries";

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
                    <form onSubmit={handleSubmit(data => props.editAuthority(data))}>

                    </form>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {AdminEditAuthority}
