/**
 *
 * ManagerHomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Col, Row, Nav, NavItem, Glyphicon, Panel, Clearfix, Button } from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RequestsTable  from 'components/RequestsTable/Loadable';
import InformationModal from 'components/InformationModal';
import RequestReview from 'components/RequestReview/Loadable';
import EmployeeTable from 'components/Employeetable/Loadable';
import PresentationView from 'components/EmployeeInfoEditor/PresentationView';
import makeSelectManagerHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getAllRequests, resolveRequest, getAllEmployees, addUser, deleteUser } from './actions';
import EmployeeInformationForm from 'components/EmployeeInformationForm/Loadable';

/* eslint-disable react/prefer-stateless-function */
export class ManagerHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: "1",
      showModal: false,
      showAddUser: false,
      selected: {
        title: '',
        id: null,
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(getAllRequests());
    this.props.dispatch(getAllEmployees());
  }

  hideModal = () => {
    this.setState({
      showModal: false,
      showAddUser: false,
      selected: {
        title: '',
        id: null,
      }
    });
  }

  showModal = (id) => {
    this.setState({
      showModal: true,
      selected: {
        title: '',
        id,
      },
    });
  }

  showAddUser = e => {
    this.setState({
      showAddUser: true,
    });
  }

  selectTab = e => {
    this.setState({
      currentTab: e,
    });
  }

  approveCurrent = des => {
    const id = this.props.managerhomepage.requests[this.state.selected.id].request_id;
    this.props.dispatch(resolveRequest(id, true, des));
    this.hideModal();
  }

  denyCurrent = des => {
    const id = this.props.managerhomepage.requests[this.state.selected.id].request_id;
    this.props.dispatch(resolveRequest(id, false, des));
    this.hideModal();
  }

  addEmployee = (info) => {
    this.props.dispatch(addUser(info));
    this.hideModal();
  }

  deleteSelectedEmployee = () => {
    this.props.dispatch(deleteUser(this.props.managerhomepage.employees[this.state.selected.id].employee_id));
    this.hideModal();
  }

  render() {
    let currentView = null;
    let modalView = null;

    if (this.state.currentTab === "1") {
      currentView = (
        <div>
          <RequestsTable
            requests={this.props.managerhomepage.requests}
            onRowClick={this.showModal}
          /> 
        </div>
      );

      modalView = () => 
        <RequestReview 
          request={(this.state.selected.id) ? this.props.managerhomepage.requests[this.state.selected.id] : {}} 
          approve={this.approveCurrent}
          deny={this.denyCurrent}
        />;
    } else if (this.state.currentTab === "2") {
      currentView = (
        <div>
          <Grid fluid>
            <Row>
              <Col sm={12} style={{ padding: '0px' }}>
                <Clearfix>
                  <Panel style={{ marginBottom: '0px' }}>
                    <Panel.Heading style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      Employee List 
                      <Button bsStyle="info" onClick={this.showAddUser}>
                        <Glyphicon glyph="plus"/>
                      </Button>
                    </Panel.Heading>
                  </Panel>
                </Clearfix>
              </Col>
            </Row>
          </Grid>
          <EmployeeTable 
            employees={this.props.managerhomepage.employees}
            onRowClick={this.showModal}
          />
        </div>
      );

      modalView = () => {
        if (!this.state.selected.id)
          return null;
          
        const employee = this.props.managerhomepage.employees[this.state.selected.id]
        return (
          <div>
            <PresentationView
              firstName = {employee.first_name}
              lastName = {employee.last_name}
              email = {employee.email}
              hideButton
              edit={() => console.log('add')}
            />
            <Button bsStyle="danger" block onClick={this.deleteSelectedEmployee}>Delete Employee</Button>
          </div>
        );
      };
    }

    return (
      <div>
          <Grid fluid>
            <Row>
              <Col sm={12} md={8} mdOffset={2}>
                <Nav bsStyle="tabs" activeKey={this.state.currentTab} onSelect={k => this.selectTab(k)}>
                  <NavItem eventKey="1">
                    Manage Requests
                  </NavItem>
                  <NavItem eventKey="2">
                    Manage Users
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            <Row>
                <Col sm={12} md={8} mdOffset={2}>
                  {currentView}
                  <InformationModal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    title={(this.state.currentTab === 1) ? "Request" : "Employee"}
                    bodyRender={modalView}
                  />
                  <InformationModal
                    show={this.state.showAddUser}
                    onHide={this.hideModal}
                    title="Add Employee"
                    bodyRender={() => <EmployeeInformationForm error={null} loading={false} submit={this.addEmployee} />}
                  />
                </Col>
              </Row>
            </Grid>
      </div>
    );
  }
}

ManagerHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerhomepage: makeSelectManagerHomePage(),
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

const withReducer = injectReducer({ key: 'managerHomePage', reducer });
const withSaga = injectSaga({ key: 'managerHomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagerHomePage);
