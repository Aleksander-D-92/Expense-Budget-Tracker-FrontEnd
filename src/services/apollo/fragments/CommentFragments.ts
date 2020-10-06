import {gql} from "@apollo/client";

const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        commentId
        movieDBId
        submitterId
        favoriteType
        title
        description
        creationDate
    }
`
export {COMMENT_FRAGMENT}
