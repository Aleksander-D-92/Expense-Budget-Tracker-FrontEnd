import {ApolloClient, InMemoryCache} from '@apollo/client';

const DEV_URL = 'http://localhost:8080/graphql';
const PROD_URL = 'https://theatre-database.herokuapp.com/graphql';

function GetClient(jwt: string) {
    return new ApolloClient({
        uri: PROD_URL,
        headers: {
            Authorization: jwt
        },
        cache: new InMemoryCache()
    })
}

export {GetClient}

/*
using this to pass as response arguments if the response is pointless,
 to avoid wiring a separate interface for every "GET" query
 */
export interface Dummy {

}
