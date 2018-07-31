/**
 *
 * TableView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Table } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TableView(props) {
  let uniqueKey = 0;

  const headerNodes = [];
  for (let s in props.columns) {
    headerNodes.push(
      <th key={(uniqueKey++).toString()}>{props.columns[s]}</th>
    );
  }

  const tableRows = [];
  for (let r in props.entries) {
    
    let rowData = [];
    for (let entry in props.entries[r]) {
      rowData.push(
        <td key={(uniqueKey++).toString()}>{props.entries[r][entry]}</td>
      );
    }

    tableRows.push(
      <tr
        key={(uniqueKey++).toString()}
        id={r.toString()}
        onClick={() => (props.onRowClick) ? props.onRowClick(r.toString()) : {}}
      >
        {rowData}
      </tr>
    );
  }

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <div>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              {headerNodes}
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

TableView.propTypes = {
  columns: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default TableView;
