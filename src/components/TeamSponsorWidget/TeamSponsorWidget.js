// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose, graphql} from "react-apollo";
import getSponsor from "./getSponsor";
import SponsorInfoBox from "../SponsorInfoBox/SponsorInfoBox";
import {Button, Modal} from "antd";
import SponsorForm from "../SponsorForm/SponsorForm";
import setTeamSponsor from "./setTeamSponsor";

class TeamSponsorWidget extends Component {

    static propTypes = {
        teamId: PropTypes.string.isRequired,
        getSponsor: PropTypes.object.isRequired,
        setTeamSponsorMutation: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            addModal: false,
            selectModal: false,
        }

    }

    componentDidMount(){

    }

    onCreateSponsor(sponsorId){

        this.props
            .setTeamSponsorMutation({
                refetchQueries: [{ query: getSponsor, variables: { teamId: this.props.teamId } }],
                variables: {
                    teamId: this.props.teamId,
                    sponsorId
                },
            })
            .then(res => {
                console.log(res);

            });

    }

    onRemoveSponsor(){
        this.props
            .setTeamSponsorMutation({
                refetchQueries: [{ query: getSponsor, variables: { teamId: this.props.teamId } }],
                variables: {
                    teamId: this.props.teamId,
                    sponsorId: null
                },
            })
            .then(res => {
                console.log(res);

            });
    }

    render(){

        return <div>


            {this.props.getSponsor.teamSponsor ?
                <div>
                    <SponsorInfoBox sponsor={this.props.getSponsor.teamSponsor}/>
                    <a
                        style={{marginLeft: 10, color: 'red'}}
                        onClick={()=>{this.onRemoveSponsor()}}
                    >
                        Sponsor entfernen
                    </a>
                </div>
                :
                <div>
                    <div style={{ padding: 8, textAlign: 'left' }}>
                        <a
                            onClick={()=>{this.setState({addModal: true})}}
                        >
                            Neuen Sponsor erstellen
                        </a>
                    </div>
                    <div className="clear"></div>
                    <Modal
                        title="Sponsor erstellen"
                        visible={this.state.addModal}
                        footer={null}
                        onCancel={()=>{ this.setState({addModal: false})}}
                    >
                        <SponsorForm onCreate={(sponsorId)=>{
                            this.onCreateSponsor(sponsorId)
                            this.setState({addModal: false})
                        }} />
                    </Modal>
                </div>
            }

        </div>;
    }

}

export default compose(
    graphql(setTeamSponsor, {name: 'setTeamSponsorMutation',}),
    graphql(getSponsor, {
        name: 'getSponsor',
        options: props => ({
            variables: { teamId: props.teamId },
        }),
    }),
)(TeamSponsorWidget);