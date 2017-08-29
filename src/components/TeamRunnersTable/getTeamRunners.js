import gql from 'graphql-tag'

const runnersQuery = gql`
    query TeamRunnerList($team_id: ID!) {
        teamRunnerList(team_id:$team_id){
            total
            runners {
              id
              number
              email
              firstName
              lastName
            }
          }
    }
`;

export default runnersQuery;