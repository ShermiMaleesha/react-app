import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Card, CardBody, CardGroup, Col, Container,Modal,ModalHeader,ModalBody,ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {TextInput,NavItem,CardPanel}from 'react-materialize';



const SignInPage = () => (
  <div>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody style={{ color:'black' }}>
                  <Form onSubmit={this.onSubmit}>
                  <CardPanel className="teal">
                      <span >
                      <div className="text-center" style={{color: 'black'}}><h1>SIGN IN</h1></div>
                      </span>
                  </CardPanel>
                    <InputGroup className="mb-3">
                      <TextInput  icon="email" type="email" placeholder="Email" name = 'email' value={email}  onChange={this.onChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <TextInput  icon="lock" type="password" placeholder="Password" name = 'password' value={password} onChange={this.onChange} />
                    </InputGroup>
                    <Row >
                        <Col xs={{ size: 7.5, offset: 5 }} >
                        <div className="text-right"><Button  color="dark" className="text-center">Login</Button></div>
                        </Col>
                    </Row>
                    <Row>
                    <Col xs="7" >
                    <p>
                    <div className="text-right"><NavItem  style={{color: 'black'}} href={ROUTES.PASSWORD_FORGET} >Forgot Password?</NavItem></div>
                    </p>
                    </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>         
            </CardGroup>
          </Col>
        </Row>
      </Container>
      <div className="center red-text">
         {error && <p>{error.message}</p>}
      </div>
    </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
