
import gql from 'graphql-tag';

const query = gql`query getTeam($id: String) {
    team(id: $id){
        id
        name
    }
}
`;

export default query;



