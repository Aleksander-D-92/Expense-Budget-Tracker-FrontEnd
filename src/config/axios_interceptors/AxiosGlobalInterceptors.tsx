import React, {useEffect} from "react";
import axios from 'axios'


function AxiosGlobalInterceptors() {
    useEffect(() => {
        axios.interceptors.request.use((config) => {
            // const herokuUrl='https://destroy-bugs.herokuapp.com';
            // const localHostUrl = 'http://localhost:8080';
            const jwt = localStorage.getItem('jwt');
            if (jwt !== undefined && jwt !== null) { //check if JWT is present
                config.headers.Authorization = `Bearer ${jwt}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

    }, [])

    return (
        <>
        </>
    )
}

export {AxiosGlobalInterceptors}
