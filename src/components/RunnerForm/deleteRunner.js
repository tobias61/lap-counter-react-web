import gql from 'graphql-tag'


const mutation = gql`mutation deleteRunner($id: String) {
  deleteRunner(id: $id) {
    success
    message
  }
}`;

export default mutation;
