// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import RunnerResultTable from "../RunnerResultTable/RunnerResultTable";
import runnersQuery from "./allRunnerResults";
import {graphql, compose} from "react-apollo";

class ResultsAllRunner extends Component {

    static propTypes = {
        sort: PropTypes.string,
        data: PropTypes.object,
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){
        return <div style={{padding: '0 10px'}}>
            <h1>Ergebnisse aller Läufer</h1>
            <RunnerResultTable runners={this.props.data.allRunnerResults ? this.props.data.allRunnerResults.runners : []} />
        </div>;
    }

}

export default compose(
    graphql(runnersQuery, { options: (props)=>({
        fetchPolicy: 'network-only',
        variables: {
            sort: props.sort
        }
    })})
)(ResultsAllRunner);
