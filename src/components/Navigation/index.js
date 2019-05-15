import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';


const Navigation = () => (
  <nav className = "nav-wrapper grey darken-3">
    <div className = 'container'>
            <Link to = '/' className='brand-logo'>DinLanka Logistics (Pvt) Ltd</Link>           
            <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth /> : <NavigationNonAuth />
             }
            </AuthUserContext.Consumer>     
    </div>
  </nav>
);

const NavigationAuth = () => (
  <div>
  <ul className="right">
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div>
      <ul className="right">
        <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
      </ul>
  </div>
  
);

export default Navigation;
