/**
 *
 * AlertBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Alert, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class AlertBox extends React.PureComponent {
  render() {
    if (this.props.show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.handleDismiss}>
          <h4>{ this.props.title }</h4>
          <p>
            {this.props.message}
          </p>
          <p>
            <Button bsStyle="danger" bsSize="small" onClick={this.props.takeAction}>Clear Input</Button>
            <span> or </span>
            <Button bsStyle="warning" bsSize="small" onClick={this.props.handleDismiss}>Hide Error</Button>
          </p>
        </Alert>
      );
    }

    return <React.Fragment></React.Fragment>;
  }
}

AlertBox.propTypes = {
  show: PropTypes.bool.isRequired,
  handleDismiss: PropTypes.func,
  takeAction: PropTypes.func,
};

export default AlertBox;
