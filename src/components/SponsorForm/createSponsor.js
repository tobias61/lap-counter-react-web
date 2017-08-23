import gql from 'graphql-tag';

const mutation = gql`mutation createSponsor($sponsorInput: SponsorInput, $runner_id: String) {
    createSponsor(sponsor: $sponsorInput, runner_id: $runner_id) {
        id
        name
        contact_firstName
        contact_lastName
        sponsor_amount
        cash
        donation_receipt
    }
}`;

export default mutation;
