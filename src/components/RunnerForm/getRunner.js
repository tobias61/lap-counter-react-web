import gql from 'graphql-tag'

const query = gql`query getRunner($id: String) {
  runner(id: $id){
    id
    gender
    lastName
    firstName
    email
      number
    sponsor {
      id
      name
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