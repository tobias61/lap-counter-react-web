// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import RunnerResultTable from "../RunnerResultTable/RunnerResultTable";
import teamResult from "./teamResult";
import {Link} from "react-router-dom";
import {graphql, compose} from "react-apollo";
import {connect} from "react-redux";
import {Col, Row} from "antd";
import * as moment from "moment";
import * as _ from "lodash";

class ResultTeam extends Component {

    static propTypes = {

        id: PropTypes.string.isRequired,
        team: PropTypes.object
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){

      if (!this.props.team){
        return <div></div>
      }

      const team = this.props.team;


        return <div style={{padding: '0 10px'}}>
            <h1 style={styles.h1}>Team: {team.name}</h1>
            <div>
              <Row>
                  <Col span={12} style={{padding: "0 15px"}}>
                      <h2 style={styles.h2}>Info</h2>
                      <p>
                        <label>Name: </label>
                        <span>{team.name}</span>
                      </p>
                      <p>
                        <label>Teamgröße: </label>
                        <span>{team.team_size || 'Keine Angabe'} </span>
                      </p>

                      {
                        !!team.sponsor && <div>
                          <h3>Sponsor</h3>
                          <p>
                            <label>Sponsor: </label>
                            <span>{team.sponsor.contact_firstName} {team.sponsor.contact_lastName}</span>
                          </p>
                          <p>
                            <label>Betrag pro Runde: </label>
                            <span>{team.sponsor.sponsor_amount || 'Keine Angabe'}</span>
                          </p>
                        </div>
                      }

                    <br/>
                      <p>
                        <Link to={"/teams/"+team.id}>Team-Details bearbeiten</Link>
                      </p>

                  </Col>
                  <Col span={12} style={{padding: "0 15px"}}>
                      <h2 style={styles.h2}>Ergebnis</h2>

                      {!!team.sponsor && !!team.sponsor.sponsor_amount && <h4>Erlaufener Betrag: {parseFloat(team.sponsor.sponsor_amount) * team.laps} €</h4>}

                      <p>
                        <label>Runden: </label>
                        <span>{team.laps}</span>
                      </p>

                  </Col>
              </Row>
            </div>
        </div>;
    }

}

const styles = {
    h1: {
      padding: '0 15px'
    },
    h2 : {
        padding: '10px 0'
    }
}


export default compose(
  graphql(teamResult, {
      options: props => ({
          fetchPolicy: 'network-only',
          variables: { id: props.id },
      }),
  }),
  connect(( state, ownProps )=>{
    console.log(ownProps);
      return {
          team: ownProps.data.team
      }
  })
)(ResultTeam);
