import {gql} from "@apollo/client";

interface UserDetails {
    userId: number
    username: string
    registrationDate: Date
    accountNonLocked: boolean,
    authorities: [Authorities]

}

interface Authorities {
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

export { ALL_USERS, USER_BY_ID}
