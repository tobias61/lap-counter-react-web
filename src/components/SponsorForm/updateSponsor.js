
import gql from 'graphql-tag';

const mutation = gql`mutation updateSponsor($id: ID!, $sponsorInput: SponsorInput!) {
    updateSponsor(id: $id,sponsor: $sponsorInput) {
        id
        contact_firstName
        contact_lastName
        email
        sponsor_amount
        cash
        donation_receipt
    }
}
`;

export default mutation;


