// @flow
import React, {Component} from "react"
import PropTypes from 'prop-types';
import {Button, Form, Input, Table} from 'antd';
import {Link} from "react-router-dom";
import {request} from "graphql-request";
import {runnerFilter} from './../../utils/filters';
import * as moment from "moment";
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

        this.state = {
          search: null
        }
    }

    componentDidMount(){

    }

    onSearch(text){
      this.setState({
        search: text
      })
    }

    render(){

        const dataSource = this.props.runners.map((item,index)=> ({...item, laps: item.laps || 0, number: item.number || '-', position: index+1})).filter(item => runnerFilter(item, this.state.search));
        const columns = [{
            title: 'Platz',
            dataIndex: 'position',
            key: 'position',
            render: (text, item) => <Link to={"/results/runner/"+item.id}>{text}</Link>,
        },{
            title: 'Runden',
            dataIndex: 'laps',
            key: 'laps',
            render: (text, item) => <Link to={"/results/runner/"+item.id}>{text}</Link>,
        },{
            title: 'Startnummer',
            dataIndex: 'number',
            key: 'number',
            render: (text, item) => <Link to={"/results/runner/"+item.id}>{text}</Link>,
        },{
            title: 'Vorname',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text, item) => <Link to={"/results/runner/"+item.id}>{text}</Link>,
        }, {
            title: 'Nachname',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (text, item) => <Link to={"/results/runner/"+item.id}>{text}</Link>,
        }, {
            title: 'Alter',
            dataIndex: 'age',
            key: 'age',
            render: (text, item) => <Link to={"/results/runner/"+item.id}>{text}</Link>,
        }];

        if (dataSource.length && dataSource[0].fastestLap){
          columns.push({
              title: 'Schnellste Runde',
              dataIndex: 'fastestLapTime',
              key: 'fastestLapTime',
              render: (text, item) => <Link to={"/results/runner/"+item.id}>{moment(item.fastestLapTime).format('m:s')}</Link>,
          })
        }

        return <div>
            <Search
              placeholder="Suche nach Name, Startnummer, Email"
              style={{ flex: 1 }}
              onSearch={value => this.onSearch(value)}
            />
            <Table dataSource={dataSource} columns={columns} />
        </div>;
    }

}

export default RunnerResultTable;
