// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import RunnerResultTable from "../RunnerResultTable/RunnerResultTable";
import runnersQuery from "./personalRunnerResults";
import {graphql, compose} from "react-apollo";

class ResultsPersonalRunner extends Component {

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
            <h1>Ergbnisse Einzelläufer</h1>
            <RunnerResultTable runners={this.props.data.personalResults ? this.props.data.personalResults.runners : []} />
        </div>;
    }

}

export default compose(
    graphql(runnersQuery, { options: (props)=>({
        fetchPolicy: 'network-only',
        variables: {
            minAge: props.minAge,
            maxAge: props.maxAge
        }
    })})
)(ResultsPersonalRunner);
