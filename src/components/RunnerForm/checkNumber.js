import gql from 'graphql-tag'
export const checkNumberQuery = `query checkNumber($number: Int!, $runner_id: String) {
    checkNumber(number: $number, runner_id: $runner_id){
        available
    }
}
`;
const query = gql(checkNumberQuery);

export default query;