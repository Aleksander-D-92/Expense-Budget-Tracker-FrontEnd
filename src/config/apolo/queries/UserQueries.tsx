import {gql} from "@apollo/client";
import {AUTHORITY_FRAGMENT, USER_DETAILS_FRAGMENT} from "../fragments/UserFragments";

export interface UserDetails {
    userId: number
    username: string
    registrationDate: Date
    accountNonLocked: boolean,
    authorities: [Authority]

}

export interface Authority {
    authorityId: number,
    authority: string
}


interface Message {
    message: Message
}


export interface AllUsersQueryResp {
    allUsers: [UserDetails]
}

const ALL_USERS = gql`
    query {
        allUsers {
            ...userDetails
        }
    }
    ${USER_DETAILS_FRAGMENT}
`

export interface UserByIdQueryResult {
    userById: UserDetails
}

export interface UserByIdQueryVars {
    id: number
}

const USER_BY_ID = gql`
    query userById($id: ID!) {
        userById(id: $id) {
            ... userDetails
        }
    }
    ${USER_DETAILS_FRAGMENT}
`

export interface AllAuthoritiesQueryResp {
    allAuthorities: Authority[]
}

const ALL_AUTHORITIES = gql`
    query {
        allAuthorities {
            ...authorityDetails
        }
    }
    ${AUTHORITY_FRAGMENT}
`
export {ALL_USERS, USER_BY_ID, ALL_AUTHORITIES}
