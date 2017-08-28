import gql from 'graphql-tag'
const mutation = gql`mutation addRunnersToTeam($team_id: ID!, $runner_ids: [ID!]) {
  addRunnersToTeam(team_id: $team_id, runner_ids: $runner_ids) {
    success
  }
}`;

export default mutation;