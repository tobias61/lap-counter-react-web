import gql from 'graphql-tag'
const mutation = gql`mutation removeRunnerFromTeam($team_id: ID!, $runner_id: ID!) {
  removeRunnerFromTeam(team_id: $team_id, runner_id: $runner_id) {
    id
  }
}`;

export default mutation;