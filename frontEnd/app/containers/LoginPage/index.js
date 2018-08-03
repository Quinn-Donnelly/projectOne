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
import { Button, FormControl, FormGroup, ControlLabel, Panel, Grid, Row, Col } from 'react-bootstrap';
import AlertBox from 'components/AlertBox';

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
      password: {
        value: '',
        hasEdited: false,
      },
      hasSubmittedCurrent: false,
      ignoreAlert: false,
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  getValidationStateUsername() {
    if (this.state.hasSubmittedCurrent && !this.props.loginpage.loading && this.props.loginpage.error != null)
      return 'error';

    if (this.state.hasSubmittedCurrent && this.props.loginpage.user != null)
      return 'success';

    if (this.validateEmail(this.state.username.value))
      return 'success';

    if (this.state.username.hasEdited)
      return 'warning';

    return null;
  }

  getValidationStatePassword() {
    if (this.state.hasSubmittedCurrent && !this.props.loginpage.loading && this.props.loginpage.error != null)
      return 'error';

    if (this.state.hasSubmittedCurrent && this.props.loginpage.user != null)
      return 'success';

    if (this.state.password.hasEdited && this.state.password.value.trim() === '')
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

  clearInput = e => {
    this.setState({
      'username': {
        value: '',
        hasEdited: false,
      },
      'password': {
        value: '',
        hasEdited: false,
      },
      hasSubmittedCurrent: false,
      ignoreAlert: true,
    });
  }

  dismissAlert = () => {
    this.setState({
      ignoreAlert: true,
    });
  }

  submit = e => {
    e.preventDefault();
    const username = this.state.username.value;
    const password = this.state.password.value;
    this.props.dispatch(attemptLogin(username, password));
    this.setState({
      hasSubmittedCurrent: true,
      ignoreAlert: false,
    });
  };

  render() {
    const show = !this.state.ignoreAlert && this.state.hasSubmittedCurrent && 
      !this.props.loginpage.loading && this.props.loginpage.error != null;
    
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={8} smOffset={2}>
              <Panel>
                <Panel.Heading>
                  Login
                </Panel.Heading>
                <Panel.Body>
                  <form onSubmit={this.submit}>
                    <FormGroup
                      validationState={this.getValidationStateUsername()}
                    >
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        required
                        type="email"
                        id="username"
                        value={this.state.username.value}
                        placeholder="Enter Username"
                        onChange={this.handleChange}
                        title="This should be your work email address."
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup
                      validationState={this.getValidationStatePassword()}
                    >
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        required
                        type="password"
                        id="password"
                        value={this.state.password.value}
                        placeholder="Enter Password"
                        onChange={this.handleChange}
                        title="Your account's password"
                      />
                      <FormControl.Feedback />
                      <Button bsStyle="info" type="submit" style={{ marginTop: '10px' }}>Submit</Button>
                    </FormGroup>
                  </form>

                  <AlertBox
                    title='Error Logging In'
                    message={this.props.loginpage.error}
                    show={show}
                    handleDismiss={this.dismissAlert}
                    takeAction={this.clearInput}
                  />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid> 
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
