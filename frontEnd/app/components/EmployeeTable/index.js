/**
 *
 * EmployeeTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import TableView from 'components/TableView/Loadable';
import messages from './messages';

function EmployeeTable(props) {
  const headers = ["First Name", "Last Name", "Email", "Role"];
  const keys = ["first_name", "last_name", "email", "role"];

  const employees = props.employees.map((elm) => {
    return Object.assign({}, elm, {
      role: (elm.manager_id === 0) ? 'Manager' : 'Employee',
    email: (elm.email) ? (<a href={`mailto:${elm.email}`}>{elm.email}</a>) : 'Unknown'
    });
  });

  return (
    <div>
      <TableView
        columns={headers}
        entries={employees}
        keys={keys}
        onRowClick={(id) => props.onRowClick(id)}
      />
    </div>
  );
}

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
};

export default EmployeeTable;
