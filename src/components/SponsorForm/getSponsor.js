
import gql from 'graphql-tag';

const query = gql`query getSponsor($id: String) {
    sponsor(id: $id){
        id
        name
        contact_firstName
        contact_lastName
        cash
        email
        personal
        donation_receipt
        sponsor_amount
    }
}
`;

export default query;



