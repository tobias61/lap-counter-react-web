
import gql from 'graphql-tag';

const mutation = gql`mutation setTeamSponsor($teamId: ID!, $sponsorId: ID) {
    setTeamSponsor(team_id: $teamId,sponsor_id: $sponsorId) {
        id
    }
}
`;

export default mutation;


