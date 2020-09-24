import {gql} from "@apollo/client";

const USER_DETAILS_FRAGMENT = gql`
    fragment userDetails on User {
        userId
        username
        accountNonLocked
        registrationDate
        authorities {
            authorityId
            authority
        }
    }
`
const AUTHORITY_FRAGMENT = gql`
    fragment authorityDetails on Authorty {
        authorityId
        authority
    }
`
export {USER_DETAILS_FRAGMENT, AUTHORITY_FRAGMENT}
