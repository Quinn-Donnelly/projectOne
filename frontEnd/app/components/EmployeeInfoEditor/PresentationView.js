import React from 'react';
import { Grid, Col, Panel, Row, Glyphicon, Button, Clearfix } from 'react-bootstrap';
import AddressView from './AdressView';

export default function PresentatoinView(props) {
    return (
        <div>
          <Grid fluid>
            <Row>
                <Col sm={12} style={{ padding: '0px' }}>
                <Clearfix>
                    <Panel style={{ marginBottom: '0px' }}>
                      <Panel.Heading style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Employee Information 
                        {(props.hideButton) ? null : <Button bsStyle="info" onClick={props.edit}>
                          <Glyphicon glyph="pencil"/>
                        </Button>}
                      </Panel.Heading>
                    </Panel>
                </Clearfix>
                </Col>
            </Row>
            <Row>
              <Col sm={12}>
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
                <Row sm={6}>
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
              {/* <Col sm={6}>
                <Row>
                  <Col>
                    <AddressView
                        {...props.address}
                    />
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </Grid>
        </div>
    );
}