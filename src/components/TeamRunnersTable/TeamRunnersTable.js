// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import {Table, Icon, Button, Modal} from 'antd';
import { graphql, compose } from 'react-apollo';
import getTeamRunners from "./getTeamRunners";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import RunnerForm from "../RunnerForm/RunnerForm";
import createRunner from "../RunnerForm/createRunner";
import addRunnersToTeam from "./addRunnersToTeam";
import RunnerSearchTable from "../RunnerSearchTable/RunnerSearchTable";
import updateRunner from "../RunnerForm/updateRunner";
import removeRunnerFromTeam from "./removeRunnerFromTeam";

class TeamRunnersTable extends Component {

    static propTypes = {
        teamId: PropTypes.string.isRequired,
        runners: PropTypes.array.isRequired,
        addRunnersToTeam: PropTypes.func.isRequired,
        removeRunnerFromTeam: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props)

        this.state = {
            searchRunnerModal: true,
            addRunnerModal: false,
        }

    }

    componentDidMount(){

    }

    onDeleteClick(id){

        this.props
            .removeRunnerFromTeam({
                refetchQueries: [{ query: getTeamRunners,  variables: { team_id: this.props.teamId } }],
                variables: {
                    runner_id: id,
                    team_id: this.props.teamId
                },
            })
            .then(res => {

            });

    }

    onAddRunner(values){

        const input = {
            ...values,
            team_id: this.props.teamId
        };

        this.props
            .createRunnerMutation({
                refetchQueries: [{ query: getTeamRunners,  variables: { team_id: this.props.teamId } }],
                variables: { runnerInput: input },
            })
            .then(res => {

            });
    }

    onAddExistingRunner(ids){

        this.props
            .addRunnersToTeam({
                refetchQueries: [{ query: getTeamRunners,  variables: { team_id: this.props.teamId } }],
                variables: { team_id: this.props.teamId, runner_ids: ids },
            })
            .then(res => {

            });

    }

    render(){

        const dataSource = this.props.runners.map(item => ({
            key: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
        }));

        const columns = [{
            title: 'Vorname',
            dataIndex: 'firstName',
            key: 'firstName',
        }, {
            title: 'Nachname',
            dataIndex: 'lastName',
            key: 'lastName',
        }, {
            title: 'E-Mail',
            dataIndex: 'email',
            key: 'email',
        },{
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
      <a href={"/runners/"+record.key}>Öffnen</a>
      <span className="ant-divider" />
      <Button
          onClick={() => {
              this.onDeleteClick(record.key);
          }}
      >
              Aus Team entfernen
            </Button>
    </span>
            ),
        }];
        return <div>
            <div><div style={{ padding: 5, textAlign: 'left' }}>
                <Button
                    onClick={()=>{this.setState({addRunnerModal: true})}}
                >
                    Neuer Läufer
                </Button>
                <Button
                    style={{marginLeft: 10}}
                    onClick={()=>{this.setState({searchRunnerModal: true})}}
                >
                    Läufer suchen
                </Button>
            </div>
                <div className="clear"></div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
            <Modal
                title="Läufer hinzufügen"
                visible={this.state.addRunnerModal}
                footer={null}
                onCancel={()=>{ this.setState({addRunnerModal: false})}}
            >
                <RunnerForm onSubmit={(err, values)=>{ if (!err) {
                    this.onAddRunner(values)
                    this.setState({addRunnerModal: false})
                } }} />
            </Modal>
            <Modal
                title="Läufer hinzufügen"
                visible={this.state.searchRunnerModal}
                footer={null}
                onCancel={()=>{ this.setState({searchRunnerModal: false})}}
            >
                <RunnerSearchTable onSubmit={(ids)=>{
                    this.onAddExistingRunner(ids);
                    this.setState({searchRunnerModal: false})
                } } />
            </Modal>
        </div>;
    }

}


export default compose(
    graphql(getTeamRunners, {
        name: 'getTeamRunners',
        options: props => ({
            variables: { team_id: props.teamId },
        }),
    }),
    graphql(createRunner, {name: 'createRunnerMutation'}),
    graphql(addRunnersToTeam, {name: 'addRunnersToTeam'}),
    graphql(removeRunnerFromTeam, {name: 'removeRunnerFromTeam'}),
    connect(( state, ownProps )=>{
        return {
            runners: ownProps.getTeamRunners.teamRunnerList ? ownProps.getTeamRunners.teamRunnerList.runners : []
        }
    })
)(TeamRunnersTable);