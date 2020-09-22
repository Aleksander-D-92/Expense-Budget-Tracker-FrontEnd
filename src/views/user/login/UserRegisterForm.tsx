import React from "react";
import {Button, Checkbox, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";


interface Props {

}

function UserRegisterForm(props: Props) {
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(errors);
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="firstName"
                    error={errors.firstName}
                    name={'firstName'}
                    inputRef={register({required: true, minLength: 5})}
                    helperText={errors.firstName ? 'dsaasd' : ''}
                />
                <br/>
                <TextField
                    label="lastName"
                    name={'lastName'}
                    inputRef={register}
                />
                <br/>
                <TextField
                    label="email"
                    name={'email'}
                    inputRef={register}
                />
                <br/>
                <Checkbox
                    name={'checkbox'}
                    inputRef={register}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
                <br/>
                <Button type={'submit'} variant="contained" color="secondary">
                    Secondary
                </Button>
            </form>
        </>
    )
}

export {UserRegisterForm}
