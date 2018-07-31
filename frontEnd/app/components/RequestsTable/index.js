/**
 *
 * RequestsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import TableView from 'components/TableView/Loadable';
import messages from './messages';

function RequestsTable(props) {
  const headers = ["Title", "Description", "Date of Request", "Amount", "Status"];
  const keys = ["title", "description", "date_of_request", "amount", "status"]
  
  const tableEntries = props.requests.map((value) => {
    const date = new Date(value.date_of_request).toLocaleDateString();
    const formattedAmount = `$${value.amount.toFixed(2)}`;
    value.date_of_request = date;
    value.amount = formattedAmount;
    value.style = (value.status === "DENIED") ? "" : "";
    return value;
  });

  if (!tableEntries || tableEntries.length === 0) {
    return (
      <TableView
          columns={headers}
          entries={[]}
          keys={[]}
        />
    );
  }

  return (
    <div>
        <TableView
          columns={headers}
          entries={tableEntries}
          keys={keys}
          onRowClick={props.onRowClick}
        />
    </div>
  )
}

RequestsTable.propTypes = {
  requests: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default RequestsTable;
