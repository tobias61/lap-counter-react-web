import gql from 'graphql-tag'

const teamResultQuery = gql`
    query TeamResult($id: String!) {
        team(id: $id){
            id
            name
            team_size
            laps
            sponsor {
              contact_firstName
              contact_lastName
              sponsor_amount
            }
        }
    }
`;

export default teamResultQuery;
