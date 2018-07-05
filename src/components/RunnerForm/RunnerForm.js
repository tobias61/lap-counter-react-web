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
import {Button, Checkbox, DatePicker, Form, Input, Select} from 'antd';
import * as _ from "lodash";
import {checkNumberQuery} from "./checkNumber";
import {request} from 'graphql-request';
import * as moment from "moment";
import 'moment-timezone';

const FormItem = Form.Item;
const Option = Select.Option;

class RunnerForm extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        runner: PropTypes.object,
        sponsors: PropTypes.array,
        form: PropTypes.object,
        onCreate: PropTypes.func,
        personal: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func,
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

    cleanValues(values){
        return Object.keys(values).reduce((res, cur)=>{
            if (values[cur] === ""){
                res[cur] = null;
            }else {
                res[cur] = values[cur];
            }
            return res;
        },{})
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {

            if (values.birthday){
                values.birthday = moment(values.birthday).tz("Europe/Berlin").format();
            }

            if (this.props.onSubmit){
                this.props.onSubmit(err, this.cleanValues(values));
                return;
            }

            if (!err) {




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
                    })(<Input placeholder="100" />)}
                </FormItem>

                { this.props.personal === true ? <div>

                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                        <h3>Sponsor Informationen</h3>
                    </div>
                    <div className="clear" style={{paddingBottom: 8, paddingTop: 15}}></div>

                    <FormItem {...formItemLayout} label={<span>Sponsor Name</span>} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [

                            ],
                        })(<Input placeholder="Familie Muster" />)}
                    </FormItem>

                    <FormItem {...formItemLayout} label={<span>Kontakt: Vorname</span>} hasFeedback>
                        {getFieldDecorator('contact_firstName', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Vorname eintragen',
                                    whitespace: true,
                                },
                            ],
                        })(<Input placeholder="Max"/>)}
                    </FormItem>

                    <FormItem {...formItemLayout} label={<span>Kontakt: Nachname</span>} hasFeedback>
                        {getFieldDecorator('contact_lastName', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Nachname eintragen',
                                    whitespace: true,
                                },
                            ],
                        })(<Input  placeholder="Mustermann" />)}
                    </FormItem>

                    <FormItem {...formItemLayout} label={<span>Adresse</span>} hasFeedback>
											{getFieldDecorator('contact_address', {
												rules: [

												],
											})(<Input />)}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Kontakt E-mail" hasFeedback>
                        {getFieldDecorator('sponsor_email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'Keine gültige E-mail Adresse!',
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
                        })(<Input placeholder="5"/>)}
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

                </div> : null}



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
        if (!props.runner) return {};

        return {
            gender: {
                value: props.runner.gender,
            },
            firstName: {
                value: props.runner.firstName,
            },
            lastName: {
                value: props.runner.lastName,
            },
            email: {
                value: props.runner.email,
            },
            birthday: {
                value: moment(props.runner.birthday),
            },
            number: {
                value: props.runner.number,
            },
            sponsor_id: {
                value: props.sponsor ? props.sponsor.id : null,
            },
            name: {
                value: props.sponsor ? props.sponsor.name : null,
            },
            contact_firstName: {
                value: props.sponsor ? props.sponsor.contact_firstName : null,
            },
            contact_lastName: {
                value: props.sponsor ? props.sponsor.contact_lastName : null,
            },
					contact_address: {
						value: props.sponsor ? props.sponsor.contact_address : null,
          },
            cash: {
                value: props.sponsor ? props.sponsor.cash : null,
            },
            donation_receipt: {
                value: props.sponsor ? props.sponsor.donation_receipt : null,
            },
            sponsor_amount: {
                value: props.sponsor ? props.sponsor.sponsor_amount : null,
            },
            sponsor_email: {
                value: props.sponsor ? props.sponsor.email : null,
            }
        };
    },
})(RunnerForm);

export default WrappedRunnerForm;

// export default compose(
//     graphql(getRunner, {
//         name: 'getRunner',
//         options: props => {
//             console.log(props);
//             return {
//                 variables: { id: props.id },
//             }},
//     }),
//     graphql(createRunner, {
//         name: 'createRunnerMutation',
//     }),
//     graphql(createSponsor, {name: 'createSponsorMutation',}),
//     graphql(updateSponsor, { name: 'updateSponsorMutation' }),
//     graphql(updateRunner, { name: 'updateRunnerMutation' }),
// )(WrappedRunnerForm);
