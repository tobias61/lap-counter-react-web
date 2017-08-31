// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import RunnerResultTable from "../RunnerResultTable/RunnerResultTable";

class ResultsPersonalRunner extends Component {

    static propTypes = {
        minAge: PropTypes.number,
        maxAge: PropTypes.number,
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){
        return <div style={{padding: '0 10px'}}>
            <h1>Ergbnisse Einzelläufer</h1>
            <RunnerResultTable runners={[]}/>
        </div>;
    }

}

export default ResultsPersonalRunner;