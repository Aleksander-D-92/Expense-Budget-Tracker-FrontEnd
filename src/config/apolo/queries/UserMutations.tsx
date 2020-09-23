import {gql} from "@apollo/client";

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
