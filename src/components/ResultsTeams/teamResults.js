import gql from 'graphql-tag'

const runnersQuery = gql`
    query TeamResults($min: Int, $max: Int) {
        teamResults(min: $min, max: $max){
            teams {
                id
                name
                laps
                team_size
            }
        }
    }
`;

export default runnersQuery;