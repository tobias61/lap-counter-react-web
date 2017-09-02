import gql from 'graphql-tag'

const runnersQuery = gql`
    query SchoolTeamResults {
        schoolTeamResults{
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
