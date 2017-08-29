// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import getRunner from "../RunnerForm/getRunner";

import RunnerForm from "../RunnerForm/RunnerForm";
import sponsorsQuery from '../SponsorsTable/sponsorsList';
import {graphql, compose} from 'react-apollo';
import runnersQuery from "../RunnersTable/runnersList";
import {connect} from "react-redux";
import updateRunner from "../RunnerForm/updateRunner";
import createRunner from "../RunnerForm/createRunner";

class TeamRunnerForm extends Component {

    static propTypes = {
        id: PropTypes.string,
        onCreate: PropTypes.func,
        createRunnerMutation: PropTypes.func.isRequired,
        updateRunnerMutation: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }



    onSubmit(values){

        let input  = values;

        if (this.props.id){
            this.props
                .updateRunnerMutation({
                    refetchQueries: [{ query: runnersQuery }],
                    variables: {
                        id: this.props.id,
                        runnerInput: input
                    },
                })
                .then(res => {

                });
        }else {
            this.props
                .createRunnerMutation({
                    refetchQueries: [{ query: runnersQuery}],
                    variables: { runnerInput: input },
                })
                .then(res => {
                    if (!this.props.id && this.props.onCreate){
                        console.log(res);
                        this.props.onCreate(res.data.createPersonalRunner.id);
                    }
                });
        }
    }

    render(){
        return <RunnerForm id={this.props.id} runner={this.props.runner} onSubmit={(err, values)=>{if (!err) this.onSubmit(values)} }/>;
    }

}

export default compose(
    graphql(getRunner, {
        name: 'getRunner',
        options: props => {
            return {
                variables: { id: props.id },
            }},
    }),
    graphql(createRunner, {name: 'createRunnerMutation'}),
    graphql(updateRunner, { name: 'updateRunnerMutation' }),
    connect(( state, ownProps )=>{
        return {
            runner: ownProps.getRunner.runner
        }
    })
)(TeamRunnerForm);