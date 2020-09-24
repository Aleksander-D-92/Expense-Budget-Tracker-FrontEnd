import {gql} from "@apollo/client";

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

export interface UserByIdQuery {
    userById: UserDetails
}

export interface UserByIdQueryVars {
    id: number
}

export interface AllUsersQuery {
    allUsers: [UserDetails]
}

const ALL_USERS = gql`
    query {
        allUsers {
            userId
            username
            registrationDate
            accountNonLocked
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
            registrationDate
            accountNonLocked
            authorities {
                authorityId
                authority
            }
        }
    }
`

export interface AllAuthoritiesResp {
    allAuthorities: Authority[]
}

const ALL_AUTHORITIES = gql`
    query {
        allAuthorities {
            authorityId
            authority
        }
    }

`
export {ALL_USERS, USER_BY_ID, ALL_AUTHORITIES}
