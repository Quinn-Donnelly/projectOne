/**
 *
 * RequestForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button, Panel, Grid, Row, Col } from 'react-bootstrap';
import AlertBox from 'components/AlertBox';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class RequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignoreAlert: false,
      hasSubmittedCurrent: false,
      request: {
        title: {
          value: '',
          hasEdited: false,
        },
        description: {
          value: '',
          hasEdited: false,
        },
        amount: {
          value: 0,
          hasEdited: false,
          isNaN: false,
        }
      },
    };
  }

  handleChange = e => {
    let request = {...this.state.request}
    request[e.target.id] = {
      value: e.target.value,
      hasEdited: true,
    };

    this.setState({ 
      hasSubmittedCurrent: false,
      request,
    });
  }

  handleChangeNumber = e => {
    let request = {...this.state.request}
    try {
      request[e.target.id] = {
        value: parseFloat(e.target.value),
        hasEdited: true,
        isNaN: false,
      };
    } catch (e) {
      request[e.target.id].isNaN = true;
    }

    this.setState({ 
      hasSubmittedCurrent: false,
      request,
    });
  }

  submit = e => {
    e.preventDefault();
    const request = {
      title: this.state.request.title.value,
      description: this.state.request.description.value,
      amount: this.state.request.amount.value,
    }

    this.props.submit(request);
    this.setState({
      hasSubmittedCurrent: true,
      ignoreAlert: false,
    });
  }

  dismissAlert = () => {
    this.setState({
      ignoreAlert: true,
    });
  }

  clearInput = e => {
    this.setState({
      request: {
        'title': {
          value: '',
          hasEdited: false,
        },
        'description': {
          value: '',
          hasEdited: false,
        },
        'amount': {
          value: 0,
          hasEdited: false,
          isNaN: false,
        }
      },
      hasSubmittedCurrent: false,
      ignoreAlert: true,
    });
  }

  getValidationStateTitle() {
    if (this.state.hasSubmittedCurrent && this.props.error) 
      return 'error';

    if (this.state.request.title.hasEdited && this.state.request.title.value.trim() === '')
      return 'warning';

    if (this.props.success && this.state.hasSubmittedCurrent)
      return 'success';

    return null;
  }

  getValidationStateAmount() {
    if (this.state.hasSubmittedCurrent && this.props.error) 
      return 'error';

    if (this.state.request.amount.hasEdited && this.state.request.amount.value === 0)
      return 'warning';
    
    if (this.props.success && this.state.hasSubmittedCurrent)
      return 'success';

    return null;
  }

  getValidationStateDescription() {
    if (this.state.hasSubmittedCurrent && this.props.error) 
      return 'error';

    if (this.props.success && this.state.hasSubmittedCurrent)
      return 'success';

    return null;
  }

  render() {
    const showError = !this.state.ignoreAlert && this.state.hasSubmittedCurrent && 
      this.props.error != null;

    let styleFeedbackForPanel = 'default';
    if (this.props.success && this.state.hasSubmittedCurrent)
      styleFeedbackForPanel = 'success';
    else if (showError)
      styleFeedbackForPanel = 'danger';
    

    return (
      <div>
        <Grid fluid>
          <Row>
            <Col sm={12}>
              <Panel bsStyle={styleFeedbackForPanel}>
                <Panel.Heading>
                  Request Form
                </Panel.Heading>
                <Panel.Body>
                  <form onSubmit={this.submit}>
                    <FormGroup
                      validationState={this.getValidationStateTitle()}
                    >
                      <ControlLabel>
                        Title
                      </ControlLabel>
                      <FormControl
                        required
                        type="text"
                        id="title"
                        value={this.state.request.title.value}
                        placeholder="Enter a title"
                        onChange={this.handleChange}
                        title="This should be a short message to explain what the request is."
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup
                      validationState={this.getValidationStateDescription()}
                    >
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        id="description"
                        componentClass="textarea"
                        placeholder="(Optional) Description of request"
                        onChange={this.handleChange}
                        value={this.state.request.description.value}
                      />
                    </FormGroup>
                    <FormGroup
                      validationState={this.getValidationStateAmount()}
                    >
                      <ControlLabel>
                        Amount
                      </ControlLabel>
                      <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl
                          required
                          type="number"
                          step={0.01}
                          id="amount"
                          placeholder="$0.00"
                          title="The amount you are requesting for reimbursment"
                          onChange={this.handleChangeNumber}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Button type="submit" bsStyle="info">Submit</Button>
                  </form>
                  
                  <AlertBox
                    title='Error Creating Request'
                    message={this.props.error}
                    show={showError}
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

RequestForm.propTypes = {};

export default RequestForm;
