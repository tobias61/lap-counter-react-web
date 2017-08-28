
import gql from 'graphql-tag';

const mutation = gql`mutation updateTeam($id: ID!, $teamInput: TeamInput!) {
    updateTeam(id: $id,team: $teamInput) {
        id
    }
}
`;

export default mutation;


