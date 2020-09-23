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
const UPDATE_PASSWORD = gql`
    mutation updatePassword($userId:ID, $oldPassword:String, $newPassword:String){
        updatePassword(
            from: { userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword }
        ) {
            message
        }
    }

`
const UPDATE_ACCOUNT_LOCK = gql`
    mutation updateAccountLock($userId:ID, $password:String){
        updateAccountLock(from: { userId: $userId, password: $password }) {
            message
        }
    }

`
export {CREATE_USER, CREATE_JWT, ALL_USERS, USER_BY_ID, UPDATE_PASSWORD, UPDATE_ACCOUNT_LOCK}
