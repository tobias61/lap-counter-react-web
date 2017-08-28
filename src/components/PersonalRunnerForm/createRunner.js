import gql from 'graphql-tag'
const mutation = gql`mutation createPersonalRunner($runnerInput: RunnerWithSponsorInput) {
  createPersonalRunner(runner: $runnerInput) {
    id
  }
}`;

export default mutation;