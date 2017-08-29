
import gql from 'graphql-tag';

const query = gql`query getTeamSponsor($teamId: ID!) {
    teamSponsor(team_id: $teamId){
        id
        name
        contact_firstName
        contact_lastName
        email
        cash
        donation_receipt
        sponsor_amount
    }
}
`;

export default query;



