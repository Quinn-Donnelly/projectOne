import React from 'react';
import { Panel } from 'react-bootstrap';

export default function AddressView(props) {
    return (
        <Panel>
          <Panel.Heading>
            Address
          </Panel.Heading>
          <Panel.Body>
            <h5>{props.country}</h5>
            <h5>
              {(props.state)? props.state : null}{` `}{(props.zipcode) ? props.zipcode : null}
            </h5>
            <h5>{props.street}</h5>
            {
              (props.apartmentNumber && props.apartmentNumber != 0) ? 
                <h5>Apt. {props.apartmentNumber}</h5>
              :
                null
            }
          </Panel.Body>
        </Panel>
    );
}