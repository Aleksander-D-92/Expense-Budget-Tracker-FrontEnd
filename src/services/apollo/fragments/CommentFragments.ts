import {gql} from "@apollo/client";

const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        commentId
        movieDBId
        favoriteType
        title
        description
        creationDate
        submitter {
            userId
            username
            registrationDate
            accountNonLocked
        }
    }
`
export {COMMENT_FRAGMENT}
