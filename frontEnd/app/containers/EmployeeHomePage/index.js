/**
 *
 * EmployeeHomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TableView  from 'components/TableView/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEmployeeHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class EmployeeHomePage extends React.Component {
  render() {
    const headers = ["First Name", "Last Name"];
    const entries = [{
      first_name: 'Quinn',
      last_name: 'Donnelly',
    },{
      first_name: 'Justin',
      last_name: 'Nunez',
    }]

    return (
      <div>
        <FormattedMessage {...messages.header} />
        <TableView
          columns={headers}
          entries={entries}
        />
      </div>
    );
  }
}

EmployeeHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  employeehomepage: makeSelectEmployeeHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'employeeHomePage', reducer });
const withSaga = injectSaga({ key: 'employeeHomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeeHomePage);
