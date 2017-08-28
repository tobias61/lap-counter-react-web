import gql from 'graphql-tag';

const mutation = gql`mutation createTeam($teamInput: TeamInput) {
    createTeam(team: $teamInput) {
        id
        name
    }
}`;

export default mutation;
