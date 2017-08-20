
import gql from 'graphql-tag';

const mutation = gql`mutation deleteSponsor($id: String) {
    deleteSponsor(id: $id) {
        success
        message
    }
}`;

export default mutation;
