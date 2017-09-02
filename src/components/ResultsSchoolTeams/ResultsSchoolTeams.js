// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import teamsQuery from "./schoolTeamResults";
import {compose, graphql} from "react-apollo";
import TeamResultTable from "../TeamResultTable/TeamResultTable";

class ResultsSchoolTeams extends Component {

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
            <h1>Ergebnisse Teamwertung Schule</h1>
            <TeamResultTable teams={this.props.data.schoolTeamResults ? this.props.data.schoolTeamResults.teams : []} />
        </div>;
    }

}

export default compose(
    graphql(teamsQuery, { options: (props)=>({
        fetchPolicy: 'network-only',
    })})
)(ResultsSchoolTeams);
