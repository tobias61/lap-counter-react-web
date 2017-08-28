
import gql from 'graphql-tag';

const mutation = gql`mutation deleteTeam($id: String) {
    deleteTeam(id: $id) {
        success
        message
    }
}`;

export default mutation;
