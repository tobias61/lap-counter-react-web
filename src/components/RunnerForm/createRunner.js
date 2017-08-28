import gql from 'graphql-tag'
const mutation = gql`mutation createRunner($runnerInput: RunnerInput) {
  createRunner(runner: $runnerInput) {
    id
  }
}`;

export default mutation;