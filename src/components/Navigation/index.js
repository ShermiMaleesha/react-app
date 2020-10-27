import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import {Navbar,NavItem} from 'react-materialize';
import { AuthUserContext } from '../Session';
import Logo from "./dinlanka.png";
import './style.css';

const Img = <img src={Logo} alt={"YourBrand"} style={{padding:5+ 'px', left: 150+ 'px', top:5 + 'px'}}/>;

const Navigation = () => (
  <Navbar className="Header black" brand={Img} alignLinks="right">     
            <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth /> : <NavigationNonAuth />
             }
            </AuthUserContext.Consumer>     
  </Navbar>
);

const NavigationAuth = () => (
  <div>
  <ul className="right">
    <li>
      <NavItem to={ROUTES.LANDING} className="test">Online Quote</NavItem>
    </li>
    <li>
      <NavItem to={ROUTES.HOME} className="test">Cargo Status</NavItem>
    </li>
    <li>
      <NavItem to={ROUTES.ACCOUNT} className="test">Account</NavItem>
    </li>
    <li>
      <NavItem to={ROUTES.ADMIN} className="test">Admin</NavItem>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <NavItem href={ROUTES.SIGN_IN} className="test">
          Sign In
        </NavItem>
      </li>
      <li>
        <NavItem href={ROUTES.HOME} className="test">
          Client login
        </NavItem>
      </li>
    </ul>
  </div>
);

export default Navigation;
