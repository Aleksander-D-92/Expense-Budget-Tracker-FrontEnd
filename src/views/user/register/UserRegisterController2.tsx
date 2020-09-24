import React, {useEffect} from "react";
import {UserRegisterForm} from "./UserRegisterForm";
import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {CREATE_USER, CreateUserVars} from "../../../config/apolo/mutations/UserMutations";
import {Dummy} from "../../../config/apolo/queries/Shared";
import {ALL_AUTHORITIES, AllAuthoritiesResp} from "../../../config/apolo/queries/UserQueries";

function UserRegisterController() {
    const [createUser, {loading: createUserLoading}] = useMutation<Dummy, CreateUserVars>(CREATE_USER);
    const {data, loading: authoritiesLoading} = useQuery<AllAuthoritiesResp>(ALL_AUTHORITIES)
    const history = useHistory();
    useEffect(() => {
        console.log(data);
    }, [data])

    function handleRegister(formData: any) {
        createUser({
            variables: {
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            }
        }).then(() => {
            history.push("/users/login")
        }).catch((err) => {
            toast.error(err.graphQLErrors[0].message, {
                position: 'bottom-right'
            });
        })
    }

    return (
        <>
            <UserRegisterForm handleSubmit={handleRegister}
                              authoritiesLoading={authoritiesLoading}
                              authorities={data?.allAuthorities}
                              loading={createUserLoading}/>
            <ToastContainer/>
        </>
    )
}

export {UserRegisterController}
