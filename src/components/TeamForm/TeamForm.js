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
import { Button, Form, Input, Checkbox, message } from 'antd';
import { graphql, compose } from 'react-apollo';
import getTeam from './getTeam';
import createTeam from './createTeam';
import updateTeam from './updateTeam';
import teamsQuery from '../TeamsTable/teamsList';
import TeamRunnersTable from "../TeamRunnersTable/TeamRunnersTable";
import TeamSponsorWidget from "../TeamSponsorWidget/TeamSponsorWidget";

const FormItem = Form.Item;

class TeamForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    getTeam: PropTypes.object.isRequired,
    form: PropTypes.object,
    createTeamMutation: PropTypes.func,
    updateTeamMutation: PropTypes.func,
      onCreate: PropTypes.func
  };

  static defaultProps = {
    id: null,
  };

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          if (this.props.id){
              this.props
                  .updateTeamMutation({
                      refetchQueries: [{ query: teamsQuery }],
                      variables: {
                          id: this.props.id,
												  teamInput: values
                      },
                  })
                  .then(res => {
                      console.log(res);
                      message.success(`Team aktualisiert`);
                  });
          }else {
              this.props
                  .createTeamMutation({
                      refetchQueries: [{ query: teamsQuery }],
                      variables: { teamInput: values },
                  })
                  .then(res => {
                        if (this.props.onCreate){
                            this.props.onCreate(res.data.createTeam.id)
                        }
                        message.success(`Team erstellt`);
                  });
          }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
        <div>
            <h2 style={{paddingLeft: 20}}>Team</h2>
      <Form style={{ padding: 10 }} onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label={<span>Name</span>} hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Name eintragen',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>

          <FormItem
              {...formItemLayout}
              label={<span>Schule?</span>}
              hasFeedback
          >
              {getFieldDecorator('isSchool', {
                  valuePropName: 'checked',
                  rules: [],
              })(<Checkbox />)}
          </FormItem>



        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Speichern
          </Button>
        </FormItem>
      </Form>

            { this.props.id ? <div style={{padding: 10}}>

                <div style={{marginBottom: 20}}>
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                        <label>Sponsor</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-14">
                        <TeamSponsorWidget teamId={this.props.id}/>
                    </div>
                    <div className="clear"></div>
                </div>

                <div>
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                        <label>Läufer</label>
                    </div>
                    <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-14">
                        <TeamRunnersTable teamId={this.props.id}/>
                    </div>
                    <div className="clear"></div>
                </div>

            </div> : null}
        </div>
    );
  }
}

const WrappedTeamForm = Form.create({
  mapPropsToFields: props => {
    if (!props.getTeam.team) return {};

    return {
      name: {
        value: props.getTeam.team.name,
      },
        isSchool: {
            value: props.getTeam.team.isSchool,
        },
    };
  },
})(TeamForm);

export default compose(
  graphql(getTeam, {
    name: 'getTeam',
    options: props => ({
        fetchPolicy: 'network-only',
        variables: { id: props.id },
    }),
  }),
  graphql(createTeam, {name: 'createTeamMutation',}),
  graphql(updateTeam, { name: 'updateTeamMutation' }),
)(WrappedTeamForm);
