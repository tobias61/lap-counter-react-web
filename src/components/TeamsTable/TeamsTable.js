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
import { message, Button, Table } from 'antd';
import { graphql, compose } from 'react-apollo';
import {Link} from "react-router-dom";
import gql from 'graphql-tag'
import teamsQuery from './teamsList';

const deleteTeam = gql`
mutation deleteTeam($id: ID!) {
  deleteTeam(id: $id) {
    success
    message
  }
}
`;

class TeamsTable extends React.Component {
    static propTypes = {
        deleteTeamMutation: PropTypes.func,
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            teamList: PropTypes.shape({
                total: PropTypes.number,
                teams: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        name: PropTypes.string.isRequired,
                    }),
                ),
            }),
        }).isRequired,
    };

    onDeleteClick(record) {
        this.props
            .deleteTeamMutation({
                refetchQueries: [{ query: teamsQuery }],
                variables: { id: record.key },
            })
            .then(res => {
                // console.log(res);
                message.success(
                    `${record.name} wurde gelöscht`,
                );
            });
    }

    render() {

        const header = <div><div style={{ padding: 10, textAlign: 'left' }}>
            <Button
                type="primary"

            >
                <Link to="/teams/create">Neu</Link>
            </Button>



        </div>
            <div className="clear"></div>
        </div>;

        if (!this.props.data.teamList || !this.props.data.teamList.teams) {
            return <div>{header}</div>;
        }
        const dataSource = this.props.data.teamList.teams.map(item => ({
            key: item.id,
            name: item.name
        }));

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'id',
                render: (text, item) => <Link to={"/teams/"+item.key}>{text}</Link>,
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
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}
export default compose(
    graphql(teamsQuery, {
        options: { fetchPolicy: 'cache-and-network' },
    }),
    graphql(deleteTeam, { name: 'deleteTeamMutation' }),
)(TeamsTable);
