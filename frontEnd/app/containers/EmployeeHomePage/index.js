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
import RequestsTable  from 'components/RequestsTable/Loadable';
import { Button } from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEmployeeHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getOwnedRequests } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EmployeeHomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getOwnedRequests());
  }

  render() {
    return (
      <div>
          <RequestsTable
            requests={this.props.employeehomepage.requests}
          />
      </div>
    )
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
