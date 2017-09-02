import gql from 'graphql-tag'

const runnersQuery = gql`
    query RunnerResult($id: String!) {
        runner(id: $id){
            id
            lastName
            firstName
            email
            laps
            lapTimes {
              index
              time
            }
            age
            birthday
            number
            sponsor {
              contact_firstName
              contact_lastName
              sponsor_amount
            }
        }
    }
`;

export default runnersQuery;
