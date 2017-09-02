// @flow
import React, {Component} from "react"
import PropTypes from 'prop-types';
import {Button, Form, Input, Table} from 'antd';
import {request} from "graphql-request";
import {Link} from "react-router-dom";

class TeamResultTable extends Component {

    static propTypes = {
        teams: PropTypes.array.isRequired
    };

    constructor(props){
        super(props)
    }

    componentDidMount(){

    }


    render(){

        const dataSource = this.props.teams.map((item,index)=> ({...item, laps: item.laps || 0, number: item.number || '-', position: index+1}));
        const columns = [{
            title: 'Platz',
            dataIndex: 'position',
            key: 'position',
            render: (text, item) => <Link to={"/results/team/"+item.id}>{text}</Link>,
        },{
            title: 'Runden',
            dataIndex: 'laps',
            key: 'laps',
            render: (text, item) => <Link to={"/results/team/"+item.id}>{text}</Link>,
        },{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, item) => <Link to={"/results/team/"+item.id}>{text}</Link>,
        },{
            title: 'Anzahl',
            dataIndex: 'team_size',
            key: 'team_size',
            render: (text, item) => <Link to={"/results/team/"+item.id}>{text}</Link>,
        }];

        return <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>;
    }

}

export default TeamResultTable;
