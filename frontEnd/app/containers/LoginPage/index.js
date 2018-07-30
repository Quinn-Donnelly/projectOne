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
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

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
  constructor(props) {
    super(props);

    this.state = {
      username: {
       value: '',
       hasEdited: false, 
      },
      hasSubmittedCurrent: false,
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  getValidationStateUsername() {
    if (this.state.hasSubmittedCurrent && !this.props.loginpage.loading && this.props.loginpage.err != null)
      return 'error';

    if (this.props.loginpage.user != null)
      return 'success';

    if (this.validateEmail(this.state.username.value))
      return 'success';

    if (this.state.username.hasEdited)
      return 'warning';

    return null;
  }

  handleChange = e => {
    this.setState({ 
      hasSubmittedCurrent: false,
      [e.target.id]: {
        value: e.target.value,
        hasEdited: true,
      }
    });
  }

  submit = e => {
    e.preventDefault();
    const username = this.state.username.value;
    //const password = document.getElementById('password').value;
    const password = "123";
    this.props.dispatch(attemptLogin(username, password));
    this.setState({hasSubmittedCurrent: true});
  };

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <form onSubmit={this.submit}>
          <FormGroup
            validationState={this.getValidationStateUsername()}
          >
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              id="username"
              value={this.state.username.value}
              placeholder="Enter Username"
              onChange={this.handleChange}
              title="This should be your work email address."
            />
            <FormControl.Feedback />
            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
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
