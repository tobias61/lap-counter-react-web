import gql from 'graphql-tag'

const query = gql`
    query TeamsList {
        teamList{
            teams {
                id
                name
            }
        }
    }
`;

export default query;