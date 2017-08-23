/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import RunnerForm from "../RunnerForm/RunnerForm";
import PropTypes from 'prop-types';
import getRunner from './../RunnerForm/getRunner';

class RunnerDetails extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		getRunner: PropTypes.object.isRequired,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {

		};
	}


	render() {


		return (
			<div>
				<RunnerForm id={this.props.id} />
			</div>
		);
	}
}
export default compose(
	graphql(getRunner, {
		name: 'getRunner',
		options: props => {
			console.log(props);
			return {
				variables: { id: props.id },
			}},
	})
)(RunnerDetails);
