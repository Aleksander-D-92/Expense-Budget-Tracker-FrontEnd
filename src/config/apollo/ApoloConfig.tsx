import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
});

export {client}

/*using this to to pass as response arguments if the response is pointless,
 to avoid wiring a separate interface for every query
 */
export interface Dummy {

}
