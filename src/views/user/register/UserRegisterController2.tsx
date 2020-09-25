import React, {useEffect} from "react";
import {UserRegisterForm} from "./UserRegisterForm";
import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {CREATE_USER, CreateUserVars} from "../../../config/apolo/mutations/UserMutations";
import {ALL_AUTHORITIES, AllAuthoritiesQueryResp} from "../../../config/apolo/queries/UserQueries";
import {Dummy} from "../../../config/apolo/ApoloConfig";

function UserRegisterController() {
    const [createUser, {loading: createUserLoading}] = useMutation<Dummy, CreateUserVars>(CREATE_USER);
    const {data, loading: authoritiesLoading} = useQuery<AllAuthoritiesQueryResp>(ALL_AUTHORITIES)
    const history = useHistory();

    function handleRegister(formData: any) {
        console.log(formData);
        createUser({
            variables: {
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                authorityId: formData.authorityId
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
