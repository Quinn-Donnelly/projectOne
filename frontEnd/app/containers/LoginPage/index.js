/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage, {
  makeSelectUsername,
  makeSelectPassword,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { attemptLogin } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  submit = e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    this.props.dispatch(attemptLogin(username, password));
  };

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <div>
          <form id="loginForm">
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
            />
            <button onClick={this.submit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
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

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
