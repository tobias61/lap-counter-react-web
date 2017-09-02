import gql from 'graphql-tag'

const runnersQuery = gql`
    query AllRunnerResults($sort: String) {
        allRunnerResults(sort: $sort){
            runners {
                id
                lastName
                firstName
                email
                laps
                age
                number
            }
        }
    }
`;

export default runnersQuery;
