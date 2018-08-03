/**
 *
 * NavigationBar
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
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import makeSelectNavigationBar, { makeSelectLocation } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: ['/login', '/employeeHome'],
    }
  }
  
  logout = e => {
    this.props.dispatch(logout());
    this.props.dispatch(push('/login'));
  }

  render() {
    const activeKey = this.state.routes.findIndex((route) => (this.props.location.pathname === route));

    return (
      <div>
        <Navbar collapseOnSelect fixedTop>
          <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">
                      Reimbursement System
                    </Link>
                  </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight activeKey={activeKey}>
              {
                !this.props.navigationbar.currentUser ?
                  <NavItem eventKey={0}>
                    Log In
                  </NavItem>
                  :
                  <NavItem eventKey={-1} onClick={() => this.logout()}>
                    Logout
                  </NavItem> 
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  navigationbar: makeSelectNavigationBar(),
  location: makeSelectLocation(),
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

const withReducer = injectReducer({ key: 'navigationBar', reducer });
const withSaga = injectSaga({ key: 'navigationBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NavigationBar);
