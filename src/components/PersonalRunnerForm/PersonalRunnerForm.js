// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import getRunner from "../RunnerForm/getRunner";
import createRunner from "./createRunner";
import updateRunner from "./updateRunner";
import RunnerForm from "../RunnerForm/RunnerForm";
import sponsorsQuery from '../SponsorsTable/sponsorsList';
import {graphql, compose} from 'react-apollo';
import runnersQuery from "../RunnersTable/runnersList";
import {connect} from "react-redux";
import { message } from 'antd';

class PersonalRunnerForm extends Component {

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
                    message.success(`Änderung gespeichert`);
                });
        }else {
            this.props
                .createRunnerMutation({
                    refetchQueries: [{ query: runnersQuery}],
                    variables: { runnerInput: input },
                })
                .then(res => {
                    message.success(`Läufer erstellt`);
                    if (!this.props.id && this.props.onCreate){
                        this.props.onCreate(res.data.createPersonalRunner.id);
                    }
                });
        }
    }

    render(){
        return <RunnerForm id={this.props.id} sponsor={this.props.runner ? this.props.runner.sponsor : null} runner={this.props.runner} personal onSubmit={(err, values)=>{if (!err) this.onSubmit(values)} }/>;
    }

}

export default compose(
    graphql(getRunner, {
        name: 'getRunner',
        options: props => {
            return {
                fetchPolicy: 'network-only',
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
)(PersonalRunnerForm);
