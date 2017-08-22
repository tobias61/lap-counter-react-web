import gql from 'graphql-tag'
export const checkNumberQuery = `query checkNumber($number: Int!) {
    checkNumber(number: $number){
        available
    }
}
`;
const query = gql(checkNumberQuery);

export default query;