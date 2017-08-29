
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Redirect} from "react-router-dom";


class Home extends Component {
    render() {
        return <Redirect to={{
            pathname: '/results'
        }}/>;
    }
}

export default Home;