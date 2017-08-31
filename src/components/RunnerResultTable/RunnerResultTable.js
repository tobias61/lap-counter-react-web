// @flow
import React, {Component} from "react"
import PropTypes from 'prop-types';
import {Button, Form, Input, Table} from 'antd';
import {request} from "graphql-request";

const FormItem = Form.Item;

const Search = Input.Search;
const query = `query RunnerList($query: String) {
        runnerList(query: $query){
            runners {
                id
                lastName
                firstName
                email
                number
            }
        }
    }`;

class RunnerResultTable extends Component {

    static propTypes = {
        runners: PropTypes.array.isRequired
    };

    constructor(props){
        super(props)
    }

    componentDidMount(){

    }


    render(){

        const dataSource = this.props.runners;
        const columns = [{
            title: 'Startnummer',
            dataIndex: 'number',
            key: 'number',
        },{
            title: 'Vorname',
            dataIndex: 'firstName',
            key: 'firstName',
        }, {
            title: 'Nachname',
            dataIndex: 'lastName',
            key: 'lastName',
        }, {
            title: 'Runden',
            dataIndex: 'laps',
            key: 'laps',
        }];

        return <div>
            <Table scroll={{ y: 300 }} dataSource={dataSource} columns={columns} />
        </div>;
    }

}

export default RunnerResultTable;