import gql from 'graphql-tag'

const mutation = gql`mutation updateRunner($id: ID!, $runnerInput: RunnerInput!) {
    updateRunner(id: $id,runner: $runnerInput) {
        id
        firstName
        lastName
        email
        sponsor {
            id
            name
        }
    }
}`;

export default mutation;