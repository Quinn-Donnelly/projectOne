/**
 *
 * RequestReview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button, Grid, Col, Row, FormGroup, ControlLabel, FormControl, Panel } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import RequestView from 'components/RequestView';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class RequestReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request: props.request || {},
      description: '',
    };
  }

  changeDescription = e => {
    this.setState({
      description: e.target.value,
    });
  }

  deny = () => {
    this.props.deny(this.state.description);
  }

  approve = () => {
    this.props.approve(this.state.description);
  }

  render() {
    return (
      <div>
        <RequestView {...this.state.request} />
        <Panel>
          <Panel.Heading>Resolution</Panel.Heading>
          <Panel.Body>
            <Grid fluid>
              <Row>
                <FormGroup>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    id="description"
                    componentClass="textarea"
                    placeholder="(Optional) Resolution Message"
                    onChange={this.changeDescription}
                    value={this.state.description}
                  />
                </FormGroup>
              </Row>
              <Row>
                <Col sm={6}>
                  <Button bsStyle="danger" block onClick={this.deny}>Deny</Button>
                </Col>
                <Col sm={6}>
                  <Button bsStyle="success" block onClick={this.approve}>Approve</Button>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

RequestReview.propTypes = {};

export default RequestReview;
