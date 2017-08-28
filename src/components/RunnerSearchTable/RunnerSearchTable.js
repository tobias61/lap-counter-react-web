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

class RunnerSearchTable extends Component {

    static propTypes = {
        onSubmit: PropTypes.func
    };

    constructor(props){
        super(props)

        this.state = {
            runners: [],
            selectedRows: null
        }

    }

    componentDidMount(){

    }

    onSearchChange(text){

        console.log(this.props.form.getFieldValue('search'));
        request('/graphql', query, {query: text}).then(res => {
            this.setState({
                runners: res.runnerList.runners
            })
        }).catch(()=>{

        })
    }

    render(){

        const dataSource = this.state.runners;

        const columns = [{
            title: 'Vorname',
            dataIndex: 'firstName',
            key: 'firstName',
        }, {
            title: 'Nachname',
            dataIndex: 'lastName',
            key: 'lastName',
        }, {
            title: 'E-Mail',
            dataIndex: 'email',
            key: 'email',
        }];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRows: selectedRows
                });
            }
        };

        const { getFieldDecorator } = this.props.form;

        return <div>
            <div style={{marginBottom: 10}}>
                <Search onSearch={(text)=>{ this.onSearchChange(text) }} placeholder="Suche nach Läufern"/>

            </div>
            <Table rowSelection={rowSelection} scroll={{ y: 300 }} dataSource={dataSource} columns={columns} />
            <div>
                <Button onClick={()=>{
                    if (this.props.onSubmit){
                        this.props.onSubmit(this.state.selectedRows.map(item => item.id))
                    }
                }} type="primary" style={{float: "right", marginTop: 10}} disabled={!this.state.selectedRows} >Auswählen</Button>
                <div className="clear"></div>
            </div>

        </div>;
    }

}

const WrappedRunnerSearchTable= Form.create({

})(RunnerSearchTable);
export default WrappedRunnerSearchTable;