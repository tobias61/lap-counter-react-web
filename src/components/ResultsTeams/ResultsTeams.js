// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import teamsQuery from "./teamResults";
import {compose, graphql} from "react-apollo";
import TeamResultTable from "../TeamResultTable/TeamResultTable";

class ResultsTeams extends Component {

    static propTypes = {

        minAge: PropTypes.number,
        maxAge: PropTypes.number,
        data: PropTypes.object,
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){
        return <div style={{padding: '0 10px'}}>
            <h1>Ergebnisse Teamwertung</h1>
            <TeamResultTable teams={this.props.data.teamResults ? this.props.data.teamResults.teams : []} />
        </div>;
    }

}

export default compose(
    graphql(teamsQuery, { options: (props)=>({
        fetchPolicy: 'network-only',
        variables: {
            min: props.min,
            max: props.max
        }
    })})
)(ResultsTeams);
