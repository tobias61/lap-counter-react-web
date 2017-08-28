import gql from 'graphql-tag'

const mutation = gql`mutation updatePersonalRunner($id: ID!, $runnerInput: RunnerWithSponsorInput!) {
    updatePersonalRunner(id: $id,runner: $runnerInput) {
        id
    }
}`;

export default mutation;