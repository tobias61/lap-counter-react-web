import gql from 'graphql-tag'

const runnersQuery = gql`
    query RunnerList {
        runnerList{
            runners {
                id
                lastName
                firstName
                email
                number
            }
        }
    }
`;

export default runnersQuery;