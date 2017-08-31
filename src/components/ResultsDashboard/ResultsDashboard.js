// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import {Col, Icon, Row} from "antd";
import {Link} from "react-router-dom";


class ResultsDashboard extends Component {

    static propTypes = {

    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){
        return <div>
            <Row>
                <Col span={8} style={{padding: "0 15px"}}>
                    <h2 style={styles.h2}>Einzel-Wertung</h2>
                    <ul>
                        <li><Link to="/results/personal?minAge=0&maxAge=10">Einzel 0-10 Jahre</Link></li>
                        <li><Link to="/results/personal?minAge=11&maxAge=15">Einzel 11-15 Jahre</Link></li>
                        <li><Link to="/results/personal?minAge=16&maxAge=25">Einzel 16-25 Jahre</Link></li>
                        <li><Link to="/results/personal?minAge=26&maxAge=39">Einzel 26-39 Jahre</Link></li>
                        <li><Link to="/results/personal?minAge=40&maxAge=60">Einzel 40-60 Jahre</Link></li>
                        <li><Link to="/results/personal?minAge=60&maxAge=120">Einzel Ü 60 Jahre</Link></li>
                    </ul>

                </Col>
                <Col span={8} style={{padding: "0 15px"}}>
                    <h2 style={styles.h2}>Team-Wertung</h2>
                    <ul>
                        <li><Link to="/results/teams?school=false&minTeamSize=0&maxTeamSize=15">Teams bis 15 Teilnehmer</Link></li>
                        <li><Link to="/results/teams?school=false&minTeamSize=16">Teams ab 16 Teilnehmer</Link></li>
                        <li><Link to="/results/teams?school=true">Schulklassen</Link></li>
                    </ul>
                </Col>
                <Col span={8} style={{padding: "0 15px"}}>
                    <h2 style={styles.h2}>Sonder-Wertung</h2>
                    <ul>
                        <li><Link to="/results/personal?minAge=0&maxAge=10">Jüngster</Link></li>
                        <li><Link to="/results/personal?minAge=11&maxAge=15">Ältester</Link></li>
                        <li><Link to="/results/personal?minAge=16&maxAge=25">Schnellster</Link></li>
                    </ul>
                </Col>
            </Row>
        </div>;
    }

}

const styles = {
    h2 : {
        padding: '10px 0'
    }
}

export default ResultsDashboard;