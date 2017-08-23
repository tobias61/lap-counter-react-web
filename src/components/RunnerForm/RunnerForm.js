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
import {message, Button, Form, Input, Select, InputNumber, Checkbox} from 'antd';
import {graphql, compose} from 'react-apollo';
import getRunner from './getRunner';
import createRunner from './createRunner.js';
import updateRunner from './updateRunner.js';
import runnersQuery from './../RunnersTable/runnersList.js';
import * as _ from "lodash";
import {checkNumberQuery} from "./checkNumber";
import { request } from 'graphql-request';
import { DatePicker } from 'antd';
import updateSponsor from "../SponsorForm/updateSponsor";
import createSponsor from "../SponsorForm/createSponsor";
import sponsorsQuery from '../SponsorsTable/sponsorsList';

const FormItem = Form.Item;
const Option = Select.Option;

class RunnerForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    getRunner: PropTypes.object.isRequired,
    form: PropTypes.object,
    onCreate: PropTypes.func,
    createRunnerMutation: PropTypes.func.isRequired,
    updateRunnerMutation: PropTypes.func.isRequired,
    personal: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    id: null,
		personal: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      runner: {},
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let runnerKeys = ["email","lastName","firstName","birthday","number"];
				let sponsorKeys = ["email","contact_lastName","contact_firstName","sponsor_amount","cash","donation_receipt"];
				let reduceValues = (array,values) => {
					return array.reduce((res, cur)=>{
						if (cur === "email" && values[cur] === ""){
							return res;
						}
						res[cur] = values[cur];
						return res;
					},{});
        }

				let runnerValues = reduceValues(runnerKeys,values);
				let sponsorValues = reduceValues(sponsorKeys,values);

				let onCreate = (runner)=>{
					if (!this.props.id && this.props.onCreate){
						this.props.onCreate(runner);
					}
        }

				let updateSponsor = (values, runner) => {

					this.props
						.updateSponsorMutation({
							refetchQueries: [{ query: sponsorsQuery }],
							variables: {
								id: this.props.runner.sponsor.id,
								sponsorInput: values
							},
						})
						.then(res => {
							console.log(res);

						});
        }

				let createSponsor = (values, runner) => {

					this.props
						.createSponsorMutation({
							refetchQueries: [{ query: sponsorsQuery }],
							variables: {
								runner_id: runner.id,
								sponsorInput: values
							},
						})
						.then(res => {
							console.log(res);

						});
				}

          if (this.props.id){
              this.props
                  .updateRunnerMutation({
                      refetchQueries: [{ query: runnersQuery }],
                      variables: {
                          id: this.props.id,
                          runnerInput: runnerValues
                      },
                  })
                  .then(res => {
                    const runner = res.data.createRunner;
										if (this.props.personal){
										  if (runner.sponsor){
												updateSponsor(sponsorValues, runner);
                      }else {
												createSponsor(sponsorValues, runner);
                      }
										}
                  });
          }else {
              this.props
                  .createRunnerMutation({
                      refetchQueries: [{ query: runnersQuery }],
                      variables: { runnerInput: runnerValues },
                  })
                  .then(res => {
                    if (this.props.personal){
											createSponsor(sponsorValues, res.data.createRunner);
                    }else {
											onCreate(res.data.createRunner);
                    }

                  });
          }


      }
    });
  };

  componentDidMount() {
    console.log(this.props);
  }

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
      <Form style={{ padding: 10 }} onSubmit={this.handleSubmit}>

        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
          <h3>Läufer Informationen</h3>
        </div>
        <div className="clear" style={{paddingBottom: 8, paddingTop: 15}}></div>

        <FormItem {...formItemLayout} label={<span>Anrede</span>} hasFeedback>
          {getFieldDecorator('gender', {
            initialValue: 'weiblich',
            rules: [
              {
                required: true,
                message: '',
                whitespace: true,
              },
            ],
          })(
            <Select>
              <Option value="weiblich">Frau</Option>
              <Option value="männlich">Herr</Option>
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={<span>Vorname</span>} hasFeedback>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Vorname eintragen',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label={<span>Nachname</span>} hasFeedback>
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Nachname eintragen',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Geburtstag" hasFeedback>
					{getFieldDecorator('birthday', {
						rules: [
							{
								required: true,
								message: 'Geburtsdatum ist erforderlich'
							},
						],
					})(<DatePicker format="DD.MM.YYYY"/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Keine gültige E-mail Adresse!',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Startnummer" hasFeedback>
					{getFieldDecorator('number', {
						rules: [
							{
								pattern: /^\d{3}$/g,
								message: 'Startnummer muss eine dreistellige Zahl sein, z.B.: 555',
							},
							{
								validator: (rule, value, callback)=>{
								  if (!value){
										callback();
                  }
                  value = parseInt(value);

								  if (value < 100){
								    return callback(true);
                  }

                  if (_.isNumber(value)){
										request('/graphql', checkNumberQuery, {number: value, runner_id: this.props.id}).then(res => {
										  if (res.checkNumber.available === true){
												return callback();
                      }
											return callback(true);
                    }).catch(()=>{
											return callback(true);
                    })

                  }else {
										return callback(true);
                  }

								  },
								message: 'Startnummer bereits vergeben!',
							},
						],
					})(<Input />)}
        </FormItem>

        { this.props.personal ? <div>

          <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
            <h3>Sponsor Informationen</h3>
          </div>
          <div className="clear" style={{paddingBottom: 8, paddingTop: 15}}></div>

          <FormItem {...formItemLayout} label={<span>Vorname</span>} hasFeedback>
						{getFieldDecorator('contact_firstName', {
							rules: [
								{
									required: true,
									message: 'Vorname eintragen',
									whitespace: true,
								},
							],
						})(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label={<span>Nachname</span>} hasFeedback>
						{getFieldDecorator('contact_lastName', {
							rules: [
								{
									required: true,
									message: 'Nachname eintragen',
									whitespace: true,
								},
							],
						})(<Input />)}
          </FormItem>

          <FormItem
						{...formItemLayout}
            label={<span>Spendenbetrag / Runde</span>}
            hasFeedback
          >
						{getFieldDecorator('sponsor_amount', {
							rules: [
								{
									pattern: /(?:^\d{1,3}(?:\.?\d{3})*(?:,\d{2})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\.\d{2})?$)/g,
									message: 'Betrag ungültig',
								},
							],
						})(<Input />)}
          </FormItem>

          <FormItem
						{...formItemLayout}
            label={<span>Barzahlung?</span>}
            hasFeedback
          >
						{getFieldDecorator('cash', {
							valuePropName: 'checked',
							rules: [],
						})(<Checkbox />)}
          </FormItem>

          <FormItem
						{...formItemLayout}
            label={<span>Spendenbescheinigung?</span>}
            hasFeedback
          >
						{getFieldDecorator('donation_receipt', {
							valuePropName: 'checked',
							rules: [],
						})(<Checkbox />)}
          </FormItem>

        </div> : <div>

          <FormItem
						{...formItemLayout}
            label={<span>Team / Sponsor</span>}
            hasFeedback
            extra={
              <div style={{textAlign: 'left'}}>
								{this.props.getRunner.runner && this.props.getRunner.runner.sponsor
									? <a href={`/sponsors/${this.props.getRunner.runner.sponsor.id}`}>
                    Sponsor bearbeiten
                  </a>
									: this.props.id ? <div><a href={`/sponsors/create`}>
                    Sponsor erstellen
                  </a> oder <a href={`/sponsors/create`}>
                    selbst sponsorn
                  </a></div> : null}
              </div>

						}
          >
						{getFieldDecorator('sponsor_id', {
							rules: [],
						})(
              <Select
                showSearch
                placeholder="Team wählen"
                optionFilterProp="children"
                filterOption={(input, option) => {
									return option.props.children.join(' ')
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
								}}
              >
								{this.props.getRunner.sponsorList && this.props.getRunner.sponsorList.sponsors ? this.props.getRunner.sponsorList.sponsors.map(sponsor =>
                  <Option key={sponsor.id} value={sponsor.id}>
										{sponsor.name} ({sponsor.email})
                  </Option>,
								) : null}
              </Select>,
						)}
          </FormItem>

        </div>}



        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Speichern
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRunnerForm = Form.create({
  mapPropsToFields: props => {
    if (!props.getRunner.runner) return {};

    return {
      gender: {
        value: props.getRunner.runner.gender,
      },
      firstName: {
        value: props.getRunner.runner.firstName,
      },
      lastName: {
        value: props.getRunner.runner.lastName,
      },
      email: {
        value: props.getRunner.runner.email,
      },
			number: {
				value: props.getRunner.runner.number,
			},
      sponsor_id: {
        value: props.getRunner.runner.sponsor ? props.getRunner.runner.sponsor.id : null,
      },
			contact_firstName: {
				value: props.getRunner.runner.sponsor ? props.getRunner.runner.sponsor.contact_firstName : null,
			},
			contact_lastName: {
				value: props.getRunner.runner.sponsor ? props.getRunner.runner.sponsor.contact_lastName : null,
			},
			cash: {
				value: props.getRunner.runner.sponsor ? props.getRunner.runner.sponsor.cash : null,
			},
			donation_receipt: {
				value: props.getRunner.runner.sponsor ? props.getRunner.runner.sponsor.donation_receipt : null,
			},
    };
  },
})(RunnerForm);

export default compose(
  graphql(getRunner, {
    name: 'getRunner',
    options: props => {
        console.log(props);
        return {
      variables: { id: props.id },
    }},
  }),
  graphql(createRunner, {
    name: 'createRunnerMutation',
  }),
	graphql(createSponsor, {name: 'createSponsorMutation',}),
	graphql(updateSponsor, { name: 'updateSponsorMutation' }),
  graphql(updateRunner, { name: 'updateRunnerMutation' }),
)(WrappedRunnerForm);
