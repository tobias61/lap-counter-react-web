import gql from 'graphql-tag'

const runnersQuery = gql`
    query AllRunnerResults {
        allRunnerResults{
            runners {
                id
                lastName
                firstName
                email
                laps
                age
                number
                lapTimes {
                  index
                  time
                }
            }
        }
    }
`;

export default runnersQuery;
