import {ApolloClient, gql, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
});
const allUsers = gql`
    query {
        allUsers {
            userId
            userId
            authorities {
                authorityId
                authority
            }
        }
    }
`
const createUser = gql`
    mutation {
        createUser(
            form: { username: "sdasda", password: "1234", confirmPassword: "1234" }
        ) {
            message
        }
    }

`
client.query({
    query: allUsers
}).then((e) => {
    console.log(e);
});

client.mutate({
    mutation: createUser
}).then((e) => {
    console.log(e);
}).catch((e) => {
    console.log(e);
});
export {client}
