import {gql} from "@apollo/client";

export interface AdminUpdateAccountLockVars {
    userId: number,
    accountNonLocked: boolean
}

const ADMIN_UPDATE_ACCOUNT_LOCK = gql`
    mutation adminUpdateAccountLock($userId:ID, $accountNonLocked:Boolean){
        updateAccountLockAdmin(form: { userId: $userId, accountNonLocked: $accountNonLocked }) {
            message
        }
    }
`

export interface AdminUpdateAuthorityVars {
    userId: number,
    authorityId: boolean
}

const ADMIN_UPDATE_AUTHORITY = gql`
    mutation adminUpdateAuthority($userId:ID, $authorityId:ID){
        updateAuthorityAdmin(form: { userId: $userId, authorityId: $authorityId }) {
            message
        }
    }
`
