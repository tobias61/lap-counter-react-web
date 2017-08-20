import {
    ApolloClient,
    createNetworkInterface
} from 'react-apollo'

const networkInterface = createNetworkInterface({
    uri: process.env.REACT_APP_GRAPHQL_URI || "/graphql"
})

// networkInterface.use([{
//     applyMiddleware(req, next) {
//         let token = localStorage.getItem('token')
//         //headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//         req.options.headers = {
//             "Access-Control-Allow-Origin": 'http://localhost:3001',
//             ...req.options.headers
//         }
//
//         next()
//     }
// }])

const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: o => o.id,
    connectToDevTools: process.env.NODE_ENV === 'development'
})

export default client