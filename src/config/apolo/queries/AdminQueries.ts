import {gql} from "@apollo/client";
import {AUTHORITY_FRAGMENT, USER_DETAILS_FRAGMENT} from "../fragments/UserFragments";
import {Authority, UserDetails} from "./UserQueries";

export interface AdminEditUserResp {
    userById: UserDetails,
    allAuthorities: Authority[]
}

const USER_DETAILS_AND_AUTHORITIES = gql`
    query userById($id: ID!) {
        userById(id: $id) {
            ...userDetails
        }
        allAuthorities {
            ...authorityDetails
        }
    }
    ${AUTHORITY_FRAGMENT}
    ${USER_DETAILS_FRAGMENT}
`
export {USER_DETAILS_AND_AUTHORITIES}
