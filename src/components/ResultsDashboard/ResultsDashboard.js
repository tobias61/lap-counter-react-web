//@flow
import React, {Component} from "react"
import {Col, Row} from "antd";
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
                        <li><Link to="results/personal/0/10">Einzel 0-10 Jahre</Link></li>
                        <li><Link to="results/personal/11/15">Einzel 11-15 Jahre</Link></li>
                        <li><Link to="results/personal/16/25">Einzel 16-25 Jahre</Link></li>
                        <li><Link to="results/personal/26/39">Einzel 26-39 Jahre</Link></li>
                        <li><Link to="results/personal/40/60">Einzel 40-60 Jahre</Link></li>
                        <li><Link to="results/personal/60/120">Einzel Ü 60 Jahre</Link></li>
                    </ul>

                </Col>
                <Col span={8} style={{padding: "0 15px"}}>
                    <h2 style={styles.h2}>Team-Wertung</h2>
                    <ul>
                        <li><Link to="results/teams?school=false&minTeamSize=0&maxTeamSize=15">Teams bis 15 Teilnehmer</Link></li>
                        <li><Link to="results/teams?school=false&minTeamSize=16">Teams ab 16 Teilnehmer</Link></li>
                        <li><Link to="results/teams?school=true">Schulklassen</Link></li>
                    </ul>
                </Col>
                <Col span={8} style={{padding: "0 15px"}}>
                    <h2 style={styles.h2}>Sonder-Wertung</h2>
                    <ul>
                        <li><Link to="results/personal/0/10">Jüngster</Link></li>
                        <li><Link to="results/personal/11/15">Ältester</Link></li>
                        <li><Link to="results/personal/16/25">Schnellster</Link></li>
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