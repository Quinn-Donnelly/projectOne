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
import messages from './messages';

const NoMarginH3 = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

function RequestView(props) {
  const {
    title,
    amount,
    status,
    description,
    date_of_request,
    date_of_resolution,
    resolution_note,
    resolver,
    requester
  } = props;

  const dateOfRequest = (date_of_request) ? new Date(date_of_request).toLocaleDateString() : null;
  const formattedAmount = (amount && parseFloat(amount)) ? `$${amount.toFixed(2)}` : 'N/A';
  let formattedStatus = 'PENDING';
  const resolverName = (resolver) ? (`${resolver.first_name} ${resolver.last_name}`) : null;
  const requesterName = (requester) ? (`${requester.first_name} ${requester.last_name}`) : null;
  const resolutionDate = (date_of_resolution) ? new Date(date_of_resolution).toLocaleDateString() : null;

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

  let resolutionHeading = null;

  let resolutionNote = null;

  if (date_of_resolution !== null && date_of_resolution !== 0) {
    // Have a resolution
    resolutionHeading = <span>Resolution Note <small>{resolutionDate} - {resolverName}</small></span>

    resolutionNote = (resolution_note) ? 
    <Panel bsStyle={requestStatus}>
      <Panel.Heading>
        {resolutionHeading}
      </Panel.Heading>
      <Panel.Body>{resolution_note}</Panel.Body>
    </Panel> : 
    <Panel bsStyle={requestStatus}>
      <Panel.Heading>
        {resolutionHeading}
      </Panel.Heading>
    </Panel>;
  }

  return (
    <div>
      <PageHeader>{title}</PageHeader>
      <Grid fluid>
        <Row>
          <Col sm={4}>
            <Panel bsStyle={requestStatus}>
              <Panel.Heading>
                Amount Requested
              </Panel.Heading>
              <Panel.Body>
                {formattedAmount}
              </Panel.Body>
            </Panel>
          </Col>
          <Col sm={4} smOffset={4}>
            <CenterDiv>
            <NoMarginH3>
              <Label bsStyle={requestStatus}>
                {formattedStatus}
              </Label>
            </NoMarginH3>
            </CenterDiv>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Panel>
              <Panel.Heading>
                Request From:
              </Panel.Heading>
              <Panel.Body>
                {requesterName}
              </Panel.Body>
            </Panel>
          </Col>
          <Col sm={4} smOffset={4}>
            <Panel>
              <Panel.Heading>
                Requested on:
              </Panel.Heading>
              <Panel.Body>
                {dateOfRequest}
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Panel>
            <Panel.Heading>
              Request Description
            </Panel.Heading>
            <Panel.Body>
              {description}
            </Panel.Body>
          </Panel>
        </Row>
        <Row>
          {resolutionNote}
        </Row>
      </Grid>
    </div>
  );
}

RequestView.propTypes = {};

export default RequestView;
