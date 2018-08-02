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

/* eslint-disable react/prefer-stateless-function */
class EmployeeInfoEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      information: {
        firstName: 'Quinn',
        lastName: 'Donnelly',
        email: 'quinndonnelly22@gmail.com',
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

  render() {
    let viewPane = null;
    
    if (this.state.allowEditing) {
      // pane to allow editing
    } else {
      viewPane = (
        <PresentatoinView 
          {...this.state.information}
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
