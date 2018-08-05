/**
 *
 * EmployeeInfoEditor
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Row, Col, Panel, Grid, Clearfix } from 'react-bootstrap';
import messages from './messages';
import AdressView from './AdressView';
import PresentatoinView from './PresentationView';
import EditingView from './EditingView';

/* eslint-disable react/prefer-stateless-function */
class EmployeeInfoEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      information: {
        firstName: props.firstName || '',
        lastName: props.lastName || '',
        email: props.email || '',
        address: {
          country: 'USA',
          street: '118 Kilgore Ct.',
          state: 'LA',
          zipcode: 70461,
          apartmentNumber: 18,
        },
      },
      allowEditing: false,
    };
  }

  changePanel = e => {
    this.setState({
      allowEditing: !this.state.allowEditing,
    });
  }

  render() {
    let viewPane = null;
    const {saveEmployeeInformation, ...information} = this.props;
    
    if (this.state.allowEditing) {
      viewPane = (
        <EditingView 
          {...information}
          cancel={this.changePanel}
          save={(info) => { this.changePanel(); saveEmployeeInformation(info); }}
        />
      );
    } else {
      viewPane = (
        <PresentatoinView 
          {...information}
          edit={this.changePanel}
        />
      );
    }

    return (
      <div>
        {viewPane}
      </div>
    );
  }
}

EmployeeInfoEditor.propTypes = {};

export default EmployeeInfoEditor;
