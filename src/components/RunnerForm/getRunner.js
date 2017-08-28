import gql from 'graphql-tag'

const query = gql`query getRunner($id: String) {
  runner(id: $id){
    id
    gender
    lastName
    firstName
    birthday
    email
      number
    sponsor {
        id
        name
        contact_firstName
        contact_lastName
        cash
        donation_receipt
        sponsor_amount
        email
    }
  }
  sponsorList{
    sponsors {
      id
      name
      email
    }
    total
  }
}
`;

export default query;