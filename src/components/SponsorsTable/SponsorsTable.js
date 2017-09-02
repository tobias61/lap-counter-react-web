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
import sponsorsQuery from './sponsorsList';
import {Link} from "react-router-dom";


class SponsorsTable extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      sponsorList: PropTypes.shape({
        total: PropTypes.number,
        sponsors: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            contact_firstName: PropTypes.string,
            contact_lastName: PropTypes.string,
            email: PropTypes.string,
          }),
        ),
      }),
    }).isRequired,
  };

  render() {
    if (!this.props.data.sponsorList || !this.props.data.sponsorList.sponsors) {
      return <div />;
    }
    const dataSource = this.props.data.sponsorList.sponsors;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, item) =>
          <Link to={`/sponsors/${item.id}`}>
            {text}
          </Link>,
      },
      {
        title: 'Kontakt Vorname',
        dataIndex: 'contact_firstName',
        key: 'contact_firstName',
        render: (text, item) =>
          <Link to={`/sponsors/${item.id}`}>
            {text}
          </Link>,
      },
      {
        title: 'Kontakt Nachname',
        dataIndex: 'contact_lastName',
        key: 'contact_lastName',
        render: (text, item) =>
          <Link to={`/sponsors/${item.id}`}>
            {text}
          </Link>,
      },
      {
        title: 'E-Mail',
        dataIndex: 'email',
        key: 'email',
        render: (text, item) =>
          <Link to={`/sponsors/${item.id}`}>
            {text}
          </Link>,
      },
    ];

    return (
      <div>
        <div style={{ padding: 10 }}>
          <Button
            type="primary"
          >
            <Link to="/sponsors/create">Neu</Link>
          </Button>
        </div>

        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
export default compose(graphql(sponsorsQuery,{options: { fetchPolicy: 'cache-and-network' }}))(SponsorsTable);
