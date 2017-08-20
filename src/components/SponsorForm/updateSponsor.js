
import gql from 'graphql-tag';

const mutation = gql`mutation updateSponsor($id: String, $sponsorInput: SponsorInput) {
    updateSponsor(id: $id,sponsor: $sponsorInput) {
        id
        firstName
        lastName
        email
        sponsor_amount
    }
}
`;

export default mutation;


