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
import { Button, Grid, Row, Col } from 'react-bootstrap';
import InformationModal from 'components/InformationModal';
import { List } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEmployeeHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getOwnedRequests, submitRequest, getEmployeeInformation, updateEmployee } from './actions';
import RequestView from 'components/RequestView';
import RequestForm from 'components/RequestForm/Loadable';
import EmployeeInfoEditor from 'components/EmployeeInfoEditor';

/* eslint-disable react/prefer-stateless-function */
export class EmployeeHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selected: {
        title: '',
        id: null,
      }
    }
  }
  
  componentDidMount() {
    this.props.dispatch(getOwnedRequests());
    this.props.dispatch(getEmployeeInformation());
  }

  submitForm = request => {
    this.props.dispatch(submitRequest(request.title, request.description, request.amount));
  }

  hideModal = () => {
    this.setState({
      showModal: false,
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

  saveInformation = (information) => {
    this.props.dispatch(updateEmployee(information));
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col sm={6} md={4} mdOffset={2}>
              <EmployeeInfoEditor 
                saveEmployeeInformation={this.saveInformation}
                {...this.props.employeehomepage.employeeInformation}
              />
            </Col>
            <Col sm={6} md={4}>
              <RequestForm 
                submit={this.submitForm}
                success={(this.props.employeehomepage.submitRequest.id) ? true : false}
                error={this.props.employeehomepage.submitRequest.error}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={8} mdOffset={2}>
              <RequestsTable
                requests={this.props.employeehomepage.requests}
                onRowClick={this.showModal}
              />
              <InformationModal
                show={this.state.showModal}
                onHide={this.hideModal}
                title="Request"
                bodyRender={() => RequestView((this.state.selected.id) ? this.props.employeehomepage.requests[this.state.selected.id] : {})}
              /> 
            </Col>
          </Row>
        </Grid>
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
