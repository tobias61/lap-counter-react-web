/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Menu } from 'antd';
import {Link} from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item>
            <Link to="/runners">Läufer</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/teams">Teams</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/results">Auswertung</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;
