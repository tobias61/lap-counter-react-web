// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import RunnerResultTable from "../RunnerResultTable/RunnerResultTable";
import runnerQuery from "./runnerResult";
import {Link} from "react-router-dom";
import {graphql, compose} from "react-apollo";
import {connect} from "react-redux";
import {Col, Row} from "antd";
import * as moment from "moment";
import * as _ from "lodash";

class ResultRunner extends Component {

    static propTypes = {

        id: PropTypes.string.isRequired,
        runner: PropTypes.object
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){

      if (!this.props.runner){
        return <div></div>
      }

      const runner = this.props.runner;
      console.log(runner);
      const fastestLap = _.first(_.sortBy(runner.lapTimes, 'time'));

        return <div style={{padding: '0 10px'}}>
            <h1 style={styles.h1}>{runner.number ? '#'+runner.number+' - ' : '' } {this.props.runner.firstName} {this.props.runner.lastName}</h1>
            <div>
              <Row>
                  <Col span={12} style={{padding: "0 15px"}}>
                      <h2 style={styles.h2}>Info</h2>
                      <p>
                        <label>Name: </label>
                        <span>{runner.firstName} {runner.lastName}</span>
                      </p>
                      <p>
                        <label>Startnummer: </label>
                        <span>{runner.number || 'Keine Angabe'} </span>
                      </p>
                      <p>
                        <label>Alter: </label>
                        <span>{runner.age || 'Keine Angabe'} ({moment(runner.birthday).format('DD.MM.YYYY')})</span>
                      </p>
                      {
                        !!runner.sponsor && <div>
                          <h3>Sponsor</h3>
                          <p>
                            <label>Sponsor: </label>
                            <span>{runner.sponsor.contact_firstName} {runner.sponsor.contact_lastName}</span>
                          </p>
                          <p>
                            <label>Betrag pro Runde: </label>
                            <span>{runner.sponsor.sponsor_amount || 'Keine Angabe'}</span>
                          </p>
                        </div>
                      }

                    <br/>
                      <p>
                        <Link to={"/runners/"+runner.id}>Läufer-Details bearbeiten</Link>
                      </p>

                  </Col>
                  <Col span={12} style={{padding: "0 15px"}}>
                      <h2 style={styles.h2}>Ergebnis</h2>

                      {!!runner.sponsor && !!runner.sponsor.sponsor_amount && <h4>Erlaufener Betrag: {parseFloat(runner.sponsor.sponsor_amount) * runner.laps} €</h4>}

                      <p>
                        <label>Runden: </label>
                        <span>{runner.laps}</span>
                      </p>

                      <p>
                        <label>Schnellste Runde: </label>
                        <span>{fastestLap ? `${moment(fastestLap.time).format("m:s.SS")} (${fastestLap.index}. Runde)` : 'Konnte nicht bestimmt werden'}</span>
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
  graphql(runnerQuery, {
      name: 'getRunnerResults',
      options: props => ({
          fetchPolicy: 'network-only',
          variables: { id: props.id },
      }),
  }),
  connect(( state, ownProps )=>{
      return {
          runner: ownProps.getRunnerResults.runner
      }
  })
)(ResultRunner);
