/**
 *
 * EmployeeInformationForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, FormGroup, FormControl, Panel, ControlLabel, Button } from 'react-bootstrap';
import AlertBox from 'components/AlertBox';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class EmployeeInformationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSubmittedCurrent: false,
      ignoreAlert: false,
      firstName: {
        value: '',
        hasEdited: false,
      },
      lastName: {
        value: '',
        hasEdited: false,
      },
      email: {
        value: '',
        hasEdited: false
      },
      country: {
        value: '',
        hasEdited: false,
      },
      state: {
        value: '',
        hasEdited: false,
      },
      zipcode: {
        value: 0,
        hasEdited: false,
      },
      street: {
        value: '',
        hasEdited: false,
      },
      apartmentNumber: {
        value: 0,
        hasEdited: false,
      },
      password: {
        value: '',
        hasEdited: false,
      }
    };
  }

  clearInput = e => {
    this.setState({
      hasSubmittedCurrent: false,
      ignoreAlert: false,
      firstName: {
        value: '',
        hasEdited: false,
      },
      lastName: {
        value: '',
        hasEdited: false,
      },
      email: {
        value: '',
        hasEdited: false
      },
      country: {
        value: '',
        hasEdited: false,
      },
      state: {
        value: '',
        hasEdited: false,
      },
      zipcode: {
        value: 0,
        hasEdited: false,
      },
      street: {
        value: '',
        hasEdited: false,
      },
      apartmentNumber: {
        value: 0,
        hasEdited: false,
      },
      password: {
        value: '',
        hasEdited: false,
      }
    });
  }

  handleChange = e => {
    this.setState({ 
      hasSubmittedCurrent: false,
      [e.target.id]: {
        value: e.target.value,
        hasEdited: true,
      }
    });
  }

  getValidationState = () => {
    return null;
  }
  
  dismissAlert = () => {
    this.setState({
      ignoreAlert: true,
    });
  }

  submit = (e) => {
    e.preventDefault();
    this.props.submit({
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      email: this.state.email.value, 
      country: this.state.country.value, 
      state: this.state.state.value, 
      zipcode: this.state.zipcode.value, 
      street: this.state.street.value, 
      apartmentNumber: this.state.apartmentNumber.value, 
      password: this.state.password.value, 
    });
  }

  render() {
    const show = !this.state.ignoreAlert && this.state.hasSubmittedCurrent && 
      !this.props.loading && this.props.error != null;

    return (
      <div>
        <Grid fluid>
          <Row>
            <Col sm={12}>
              <Panel>
                <Panel.Heading>
                  Add Employee
                </Panel.Heading>
                <Panel.Body>
                  <form onSubmit={this.submit}>
                    <FormGroup
                      validationState={this.getValidationState()}
                    >
                      <Grid fluid>
                        <Row>
                          <Col md={6}>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl
                              required
                              type="text"
                              id="firstName"
                              value={this.state.firstName.value}
                              placeholder="First Name"
                              onChange={this.handleChange}
                              title="Should be the employees first name"
                            />
                          </Col>
                          <Col md={6}>
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl
                              required
                              type="text"
                              id="lastName"
                              value={this.state.lastName.value}
                              placeholder="Last Name"
                              onChange={this.handleChange}
                              title="Should be the employees last name"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                              required
                              type="email"
                              id="email"
                              value={this.state.email.value}
                              placeholder="Last Name"
                              onChange={this.handleChange}
                              title="Should be the employees email"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <ControlLabel>Country</ControlLabel>
                              <FormControl
                                required
                                type="text"
                                id="country"
                                value={this.state.country.value}
                                placeholder="Country"
                                onChange={this.handleChange}
                                title="Country for the employee's address"
                              />
                          </Col>
                          <Col md={6}>
                            <ControlLabel>State / Provedence</ControlLabel>
                              <FormControl
                                required
                                type="text"
                                id="state"
                                value={this.state.state.value}
                                placeholder="State / Provedence"
                                onChange={this.handleChange}
                                title="State or Provedence for the employee's address"
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <ControlLabel>Street</ControlLabel>
                            <FormControl
                              required
                              type="text"
                              id="street"
                              value={this.state.street.value}
                              placeholder="123 Somewhere Dr."
                              onChange={this.handleChange}
                              title="Street for the employee's address"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <ControlLabel>Apt. #</ControlLabel>
                            <FormControl
                              type="number"
                              id="apartmentNumber"
                              value={this.state.apartmentNumber.value}
                              placeholder="12"
                              onChange={this.handleChange}
                              title="(Optional) Apartment Number for the employee's address"
                            />
                          </Col>
                          <Col md={6}>
                            <ControlLabel>Zipcode</ControlLabel>
                            <FormControl
                              required
                              type="number"
                              id="zipcode"
                              value={this.state.zipcode.value}
                              placeholder="123456"
                              onChange={this.handleChange}
                              title="Zipcode for the employee's address"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                              <ControlLabel>Temp Password</ControlLabel>
                              <FormControl
                                required
                                type="password"
                                id="password"
                                value={this.state.password.value}
                                placeholder="*****"
                                onChange={this.handleChange}
                                title="Temporary password for the user"
                              />
                            </Col>
                        </Row>
                      </Grid>
                      <Button bsStyle="info" type="submit" style={{ marginTop: '10px' }}>Submit</Button>
                    </FormGroup>
                  </form>

                  <AlertBox
                    title='Error Logging In'
                    message={(this.props.error) || ''}
                    show={show}
                    handleDismiss={this.dismissAlert}
                    takeAction={this.clearInput}
                  />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid> 
      </div>
    );
  }
}

EmployeeInformationForm.propTypes = {};

export default EmployeeInformationForm;
