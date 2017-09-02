/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { message, Button, Table , Input} from 'antd';
import { graphql, compose } from 'react-apollo';
import {Link} from "react-router-dom";
import gql from 'graphql-tag'
import runnersQuery from './runnersList';
import {runnerFilter} from './../../utils/filters';
const Search = Input.Search;
const deleteRunner = gql`
mutation deleteRunner($id: ID) {
  deleteRunner(id: $id) {
    success
    message
  }
}
`;

class RunnersTable extends React.Component {
    static propTypes = {
        deleteRunnerMutation: PropTypes.func,
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            runnerList: PropTypes.shape({
                total: PropTypes.number,
                runners: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        firstName: PropTypes.string.isRequired,
                        lastName: PropTypes.string.isRequired,
                        email: PropTypes.string,
                    }),
                ),
            }),
        }).isRequired,
    };

    constructor(props){
        super(props)

        this.state = {
          search: null
        }
    }

    onDeleteClick(record) {
        this.props
            .deleteRunnerMutation({
                refetchQueries: [{ query: runnersQuery }],
                variables: { id: record.key },
            })
            .then(res => {
                // console.log(res);
                message.success(
                    `${record.firstName} ${record.lastName} wurde gelöscht`,
                );
            });
    }

    onSearch(text){
      this.setState({
        search: text
      })
    }

    render() {

      const header = <div><div style={{ padding: 10, textAlign: 'left' }}>
          <Button
            type="primary"

          >
            <Link to="/runners/create">Neu</Link>
          </Button>


          <div style={{ float: 'right' }}>
            <Button

            >
              <Link to="/import">Import</Link>
            </Button>
          </div>
        </div>
				<div className="clear"></div>
      </div>;

			if (!this.props.data.runnerList || !this.props.data.runnerList.runners) {
        return <div>{header}</div>;
			}
        const dataSource = this.props.data.runnerList.runners.map(item => ({
            key: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
        })).filter(item => runnerFilter(item, this.state.search));

        const columns = [
            {
                title: 'Vorname',
                dataIndex: 'firstName',
                key: 'firstName',
                render: (text, item) => <Link to={"/runners/"+item.key}>{text}</Link>,
            },
            {
                title: 'Nachname',
                dataIndex: 'lastName',
                key: 'lastName',
                render: (text, item) => <Link to={"/runners/"+item.key}>{text}</Link>,
            },
            {
                title: 'E-Mail',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '',
                key: 'action',
                render: (text, record) =>
                    <span>
            <Button
                onClick={() => {
                    this.onDeleteClick(record);
                }}
            >
              Entfernen
            </Button>
          </span>,
            },
        ];

        return (
            <div>
              {header}
              <Search
                placeholder="Suche nach Name, Startnummer, Email"
                style={{ flex: 1 }}
                onSearch={value => this.onSearch(value)}
              />
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}
export default compose(
    graphql(runnersQuery,{options: { fetchPolicy: 'cache-and-network' }}),
    graphql(deleteRunner, { name: 'deleteRunnerMutation' }),
)(RunnersTable);
