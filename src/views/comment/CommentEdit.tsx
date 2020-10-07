import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";

interface Props {
    commentId: number
    titleDefaultValue: string,
    descriptionDefaultValue: string
    editComment: Function
    editLoading: boolean
}

function CommentEdit(props: Props) {
    const {control, handleSubmit, errors, register} = useForm({
        defaultValues: {
            title: props.titleDefaultValue,
            description: props.descriptionDefaultValue
        }
    });
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSmartClose = () => {
        if (errors.title === undefined && errors.description === undefined) {
            setOpen(false);
        }
    }
    return (
        <>
            <>
                <Button color="primary"
                        disabled={props.editLoading}
                        variant={'contained'}
                        onClick={handleClickOpen}>
                    Edit {props.editLoading ?
                    <CircularProgress size={20} color={'primary'}/> : ''}

                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Edit Comment"}</DialogTitle>
                    <DialogContent style={{width: '450px'}}>
                        <form style={{width: '100%'}} onSubmit={handleSubmit((data, e) => props.editComment(data, e))}>
                            <Controller control={control}
                                        name={'title'}
                                        defaultValue={props.titleDefaultValue}
                                        rules={{minLength: 5, required: true}}
                                        as={
                                            <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                                                <Grid item>
                                                    <TitleIcon fontSize={'large'}/>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField placeholder={'Enter Title'}
                                                        // defaultValue={props.titleDefaultValue}
                                                               fullWidth={true}
                                                               label="Title"
                                                               name={'title'}
                                                               inputRef={register}
                                                               required={true}
                                                               rows={5}
                                                               error={errors.title}
                                                               helperText={errors.title ? 'Min 5 chars' : ''}

                                                    />
                                                </Grid>
                                            </Grid>
                                        }>
                            </Controller>
                            <Controller control={control}
                                        name={'description'}
                                        defaultValue={props.descriptionDefaultValue}
                                        rules={{minLength: 10, maxLength: 255, required: true}}
                                        as={
                                            <Grid container spacing={1} alignItems="flex-end" className={'mb-3'}>
                                                <Grid item>
                                                    <DescriptionIcon fontSize={'large'}/>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField placeholder={'Enter Description'}
                                                        // defaultValue={props.descriptionDefaultValue}
                                                               fullWidth={true}
                                                               label="Description"
                                                               name={'description'}
                                                               inputRef={register}
                                                               multiline={true}
                                                               required={true}
                                                               rows={5}
                                                               error={errors.description}
                                                               helperText={errors.description ? 'Min 10 charss Max 255 chars' : ''}

                                                    />
                                                </Grid>
                                            </Grid>
                                        }>
                            </Controller>
                            <DialogActions>
                                <Button onClick={handleClose}
                                        color="primary">
                                    Cancel
                                </Button>
                                <Button type={'submit'}
                                        onClick={handleSmartClose}
                                        id={props.commentId.toString()}
                                        color="secondary"
                                        disabled={false}>
                                    Edit
                                    {false ? <CircularProgress size={20} color={'primary'}/> : ''}
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        </>
    )
}

export {CommentEdit}
