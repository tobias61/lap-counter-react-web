// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import {Card} from "antd";
import {Link} from "react-router-dom";

class SponsorInfoBox extends Component {

    static propTypes = {
        sponsor: PropTypes.object
    };

    constructor(props){
        super(props)

    }

    componentDidMount(){

    }

    render(){
        if (!this.props.sponsor){
            return <div>Kein Sponsor</div>
        }

        return <Card title={this.props.sponsor.name} extra={<Link to={"/sponsors/"+this.props.sponsor.id}>Bearbeiten</Link>} style={{ width: 600 }}>
            <p>Kontakt: {this.props.sponsor.contact_firstName} {this.props.sponsor.contact_lastName}</p>
            <p>Email: {this.props.sponsor.email}</p>
            {this.props.sponsor.sponsor_amount ? <p>Spendenbetrag: {this.props.sponsor.sponsor_amount}</p> : <p>Noch kein Betrag festgelegt</p>}
        </Card>
    }

}

export default SponsorInfoBox;
