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
      isDark: false,
    }
  }
  
  logout = e => {
    this.props.dispatch(logout());
    this.props.dispatch(push('/login'));
  }

  switchTheme = () => {
    const styleLink = document.getElementById('activeStyle');
    const addedStyles = document.getElementById('addedStyle');
    
    if (!this.state.isDark) {
      styleLink.setAttribute('integrity', "sha384-RpX8okQqCyUNG7PlOYNybyJXYTtGQH+7rIKiVvg1DLg6jahLEk47VvpUyS+E2/uJ");
      styleLink.setAttribute('href', "https://stackpath.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css");

      addedStyles.innerText = `
        #app {
          background-color: #1d2227eb;
          min-height: 100%;
          min-width: 100%;
          padding-top: 70px;
        }

        .form-control {
          background-color : #d1d1d11a;
          color: #fff; 
        }
      
        input::-webkit-input-placeholder {
          color: #f3f3f394 !important;
          }
          
          input:-moz-placeholder { /* Firefox 18- */
          color: #f3f3f394 !important;  
          }
          
          input::-moz-placeholder {  /* Firefox 19+ */
          color: #f3f3f394 !important;  
          }
          
          input:-ms-input-placeholder {  
          color: #f3f3f394 !important;  
          }
      
          textarea::-webkit-input-placeholder {
            color: #f3f3f394 !important;
            }
            
            textarea:-moz-placeholder { /* Firefox 18- */
            color: #f3f3f394 !important;  
            }
            
            textarea::-moz-placeholder {  /* Firefox 19+ */
            color: #f3f3f394 !important;  
            }
            
            textarea:-ms-input-placeholder {  
            color: #f3f3f394 !important;  
            }
      `
    } else {
      styleLink.setAttribute('integrity', "sha384-Li5uVfY2bSkD3WQyiHX8tJd0aMF91rMrQP5aAewFkHkVSTT2TmD2PehZeMmm7aiL");
      styleLink.setAttribute('href', "https://stackpath.bootstrapcdn.com/bootswatch/3.3.7/readable/bootstrap.min.css");
      addedStyles.innerText =``;
    }


    this.setState({
      isDark: !this.state.isDark,
    });
    
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
                <NavItem onClick={this.switchTheme}>{(this.state.isDark) ? 'Light Theme' : 'Dark Theme'}</NavItem>
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
