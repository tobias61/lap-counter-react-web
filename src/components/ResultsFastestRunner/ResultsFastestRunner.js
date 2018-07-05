// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import RunnerResultTable from "../RunnerResultTable/RunnerResultTable";
import runnersQuery from "./fastestRunnerResults";
import {graphql, compose} from "react-apollo";
import * as _ from 'lodash';
class ResultsFastestRunner extends Component {

    static propTypes = {

        data: PropTypes.object,
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){

      if (!this.props.data.allRunnerResults){
          return <div style={{padding: 50, textAlign: 'center'}}>Bitte warten</div>
      }

      const runners = this.props.data.allRunnerResults.runners.map(item => {

        const fastestLap = _.first(_.sortBy(item.lapTimes, 'time').filter(item => item && item.time)) ;
        return {
          ...item,
          fastestLap: fastestLap,
          fastestLapTime: fastestLap ? fastestLap.time : null
        }
      })

      console.log(runners);

        return <div style={{padding: '0 10px'}}>
            <h1>Schnellste Läufer</h1>
            <RunnerResultTable runners={ _.sortBy(runners, (item)=> item.fastestLap ? item.fastestLap.time : null) } />
        </div>;
    }

}

export default compose(
    graphql(runnersQuery, { options: (props)=>({
        fetchPolicy: 'network-only',
    })})
)(ResultsFastestRunner);
