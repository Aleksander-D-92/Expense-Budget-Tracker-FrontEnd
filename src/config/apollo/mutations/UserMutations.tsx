import {gql} from "@apollo/client";

export interface CreateUserVars {
    username: string,
    password: string,
    confirmPassword: string,
    authorityId: number
}

const CREATE_USER = gql`
    mutation createUser($username: String!,$password: String!, $confirmPassword:String!, $authorityId:ID) {
        createUser(
            form: {
                username: $username,
                password: $password,
                confirmPassword: $confirmPassword,
                authorityId: $authorityId
            }
        ) {
            message
        }
    }
`

export interface CreateJWTResp {
    createJWT: {
        idToken: string
    }
}

export interface CreateJWTVars {
    username: string,
    password: string,
    rememberMe: boolean
}

const CREATE_JWT = gql`
    mutation createJWT($username: String!, $password: String!,$rememberMe: Boolean) {
        createJWT(
            form: { username: $username, password: $password, rememberMe: $rememberMe }
        ) {
            idToken
        }
    }

`

export interface UpdatePasswordVars {
    userId: number
    oldPassword: string
    newPassword: string
}

const UPDATE_PASSWORD = gql`
    mutation updatePassword($userId:ID, $oldPassword:String, $newPassword:String){
        updatePassword(
            from: { userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword }
        ) {
            message
        }
    }

`

export interface UpdateAccountLockVars {
    userId: number
    password: string
}

const UPDATE_ACCOUNT_LOCK = gql`
    mutation updateAccountLock($userId:ID, $password:String){
        updateAccountLock(from: { userId: $userId, password: $password }) {
            message
        }
    }

`
export {UPDATE_PASSWORD, UPDATE_ACCOUNT_LOCK, CREATE_JWT, CREATE_USER}
