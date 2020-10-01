import {ApolloClient, InMemoryCache} from '@apollo/client';

const DEV_URL = 'http://localhost:8080/graphql';
const PROD_URL = 'http://localhost:8080/graphql';

const client = new ApolloClient({
    uri: DEV_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    cache: new InMemoryCache()
});

export {client}

/*
using this to pass as response arguments if the response is pointless,
 to avoid wiring a separate interface for every "GET" query
 */
export interface Dummy {

}
