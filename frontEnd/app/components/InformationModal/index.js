/**
 *
 * InformationModal
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Modal, Button } from 'react-bootstrap';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class InformationModal extends React.PureComponent {
  render() {
    const {title, bodyRender, ...rest} = this.props;
    const modalBody = bodyRender();

    return (
      <Modal
        {...rest}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

InformationModal.propTypes = {};

export default InformationModal;
