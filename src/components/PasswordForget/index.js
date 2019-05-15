import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container,Modal,ModalHeader,ModalBody,ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {TextInput,NavItem}from 'react-materialize';

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <Card body  inverse color="info">
                  <Form onSubmit={this.onSubmit}>
                  <div className="text-center" style={{color: 'black'}}><h1>Input Your Email</h1></div>
                  <div className="center red-text">
                      {error && <p>{error.message}</p>}
                    </div>
                    <InputGroup className="mb-3">
                      <TextInput  icon="email" type="email" placeholder="Email" name = 'email'value={this.state.email}  onChange={this.onChange} />
                    </InputGroup>
                    <Row >
                        <Col xs="6" >
                        <div className="text-center"><Button color="dark" className="px-4">Reset My Password</Button></div>
                        </Col>
                        {error && <p>{error.message}</p>}
                    </Row>
                  </Form>
                </Card>
              </Card>         
            </CardGroup>
          </Col>
        </Row>
      </Container>
      
    </div>
      
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };