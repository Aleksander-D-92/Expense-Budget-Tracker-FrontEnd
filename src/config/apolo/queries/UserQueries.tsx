import {gql} from "@apollo/client";

const ALL_USERS = gql`
    query {
        allUsers {
            userId
            userId
            authorities {
                authorityId
                authority
            }
        }
    }
`

const USER_BY_ID = gql`
    query userById($id: ID!) {
        userById(id: $id) {
            userId
            username
            authorities {
                authorityId
                authority
            }
        }
    }
`
const CREATE_USER = gql`
    mutation createUser($username: String!,$password: String!, $confirmPassword:String!) {
        createUser(
            form: {
                username: $username,
                password: $password,
                confirmPassword: $confirmPassword
            }
        ) {
            message
        }
    }
`
const CREATE_JWT = gql`
    mutation createJWT($username: String!, $password: String!,$rememberMe: Boolean) {
        createJWT(
            form: { username: $username, password: $password, rememberMe: $rememberMe }
        ) {
            idToken
        }
    }

`
export {CREATE_USER, CREATE_JWT, ALL_USERS, USER_BY_ID}
