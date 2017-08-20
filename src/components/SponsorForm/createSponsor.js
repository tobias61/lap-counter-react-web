import gql from 'graphql-tag';

const mutation = gql`mutation createSponsor($sponsorInput: SponsorInput) {
    createSponsor(sponsor: $sponsorInput) {
        id
        name
        contact_firstName
        contact_lastName
        sponsor_amount
    }
}`;

export default mutation;
