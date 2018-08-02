import React from 'react';
import { Grid, Col, Panel, Row } from 'react-bootstrap';
import AddressView from './AdressView';

export default function PresentatoinView(props) {
    return (
        <div>
          <Grid fluid>
            <Row>
                <Col sm={8} smOffset={2} style={{ padding: '0px' }}>
                    <Panel style={{ marginBottom: '0px' }}><Panel.Heading>Employee Information</Panel.Heading></Panel>
                </Col>
            </Row>
            <Row>
              <Col sm={4} smOffset={2}>
                <Row sm={4}>
                  <Panel style={{ marginBottom: '0px'}}>
                    <Panel.Heading>
                      Name
                    </Panel.Heading>
                    <Panel.Body>
                      {`${props.firstName} ${props.lastName}`}
                    </Panel.Body>
                  </Panel>
                </Row>
                <Row sm={4}>
                  <Panel>
                    <Panel.Heading>
                      Email
                    </Panel.Heading>
                    <Panel.Body>
                      {props.email}
                    </Panel.Body>
                  </Panel>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>
                  <Col>
                    <AddressView
                        {...props.address}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
    );
}