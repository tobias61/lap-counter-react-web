import gql from 'graphql-tag'

const mutation = gql`mutation updateRunner($id: ID!, $runnerInput: RunnerInput!) {
    updateRunner(id: $id,runner: $runnerInput) {
        id
    }
}`;

export default mutation;