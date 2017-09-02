import gql from 'graphql-tag'

const runnersQuery = gql`
    query PersonalResults($minAge: Int, $maxAge: Int) {
        personalResults(minAge: $minAge, maxAge: $maxAge){
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