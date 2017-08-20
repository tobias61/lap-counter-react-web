import gql from 'graphql-tag'
const mutation = gql`mutation createRunner($runnerInput: RunnerInput) {
  createRunner(runner: $runnerInput) {
    id
    firstName
    lastName
    email
    sponsor_amount
  }
}`;

export default mutation;