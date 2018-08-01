/**
 *
 * RequestView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { PageHeader, Well, Panel, Label, Row, Col, Grid } from 'react-bootstrap';
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

  const resolutionNote = (resolution_note) ? <Well>{resolution_note}</Well> : null;
  const dateOfResolution = (date_of_resolution) ? 
    (
      <h4>
        Resolution Note <small>{new Date(date_of_resolution).toLocaleDateString()}</small>
      </h4>
    ) : null;

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
      <Grid fluid>
        <Row>
          <div>
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
        </Row>
        <Row>
          <div>
            {dateOfResolution}
            {resolutionNote}
          </div>
        </Row>
      </Grid>
    </div>
  );
}

RequestView.propTypes = {};

export default RequestView;
