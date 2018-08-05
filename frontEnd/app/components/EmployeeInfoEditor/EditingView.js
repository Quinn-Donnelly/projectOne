import React from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';

class EditingView extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				hasSubmittedCurrent: false,
				firstName: {
					value: (props.firstName) || '',
					hasEdited: false,
				},
				lastName: {
					value: (props.lastName) || '',
					hasEdited: false,
				},
				email: {
					value: (props.email) || '',
					hasEdited: false,
				},
			};
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

		save = () => {
			this.props.save({
				firstName: this.state.firstName.value,
				lastName: this.state.lastName.value,
				email: this.state.email.value,
			});
		}

		render() {
			return(
				<div>
					<Grid fluid>
						<Row>
							<Col sm={12}>
								<Panel>
									<Panel.Heading>
										Edit Information
									</Panel.Heading>
									<Panel.Body>
										<form>
											<Grid fluid>
												<Row>
													<Col sm={6}>
														<FormGroup>
															<ControlLabel>First Name</ControlLabel>
															<FormControl 
																	required
																	type="text"
																	id="firstName"
																	value={this.state.firstName.value}
																	onChange={this.handleChange}
																	title="Your first name"
															/>
														</FormGroup>
													</Col>
													<Col sm={6}>
														<FormGroup>
															<ControlLabel>Last Name</ControlLabel>
															<FormControl 
																	required
																	type="text"
																	id="lastName"
																	value={this.state.lastName.value}
																	onChange={this.handleChange}
																	title="Your last name"
															/>
														</FormGroup>
													</Col>
												</Row>
												<Row>
													<Col sm={12}>
														<FormGroup>
															<ControlLabel>Email</ControlLabel>
															<FormControl 
																	required
																	type="email"
																	id="email"
																	value={this.state.email.value}
																	onChange={this.handleChange}
																	title="Your linked email account"
															/>
														</FormGroup>
													</Col>
												</Row>
												<Row>
													<Col sm={6}>
														<Button block onClick={this.props.cancel}>Cancel</Button>
													</Col>
													<Col sm={6}>
														<Button onClick={this.save} bsStyle="success" block>Save</Button>
													</Col>
												</Row>
											</Grid>
										</form>
									</Panel.Body>
								</Panel>
							</Col>
						</Row>
					</Grid>
				</div>
			);
		}
}

export default EditingView;