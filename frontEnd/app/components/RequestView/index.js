/**
 *
 * RequestView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { PageHeader, Well, Panel, Label } from 'react-bootstrap';
import TableView from 'components/TableView';
import messages from './messages';

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
`;

function RequestView(props) {
  const {
    title,
    amount,
    status,
    description,
    date_of_request,
    date_of_resolution,
    resolution_note
  } = props;

  const dateOfRequest = (date_of_request) ? new Date(date_of_request).toLocaleDateString() : null;
  const formattedAmount = (amount && parseFloat(amount)) ? `$${amount.toFixed(2)}` : 'N/A';
  let formattedStatus = 'PENDING';

  // Pending
  let requestStatus = 'default';
  if (status === 'DENIED') {
    formattedStatus = 'DENIED';
    requestStatus = 'danger';
  }

  if (status === 'APPROVED') {
    formattedStatus = 'APPROVED';
    requestStatus = 'success';
  }

  return (
    <div>
      <PageHeader>{title}  <small>{dateOfRequest}</small></PageHeader>
      <FlexDiv>
        <Panel bsStyle={requestStatus}>
          <Panel.Body>
            {formattedAmount}
          </Panel.Body>
        </Panel>
        <h3>
          <Label bsStyle={requestStatus}>
            {formattedStatus}
          </Label>
        </h3>
      </FlexDiv>
      <Well>
        {description}
      </Well>
    </div>
  );
}

RequestView.propTypes = {};

export default RequestView;
