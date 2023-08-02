import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CartIcon from "./CartIcon";


function Header({userStatus, setUser, userCart, setItemNumber, itemNumber}){

        function handleLogOut(){
            setUser({})
          }
        function handleLogoutSubmit(){
            fetch('/logout', {
                method: 'Delete',
            }).then(() => handleLogOut());
        }


        return (
                <Row>
                <Navbar className='navbar' bg="transparent" expand="xl">
                    <Col>
                        <Navbar.Brand href="/login" >
                                <img  className='header-logo' src='/vinfetcher_v3.png' />
                        </Navbar.Brand>
                    </Col>
                    <Col>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="me-auto">
                            <Nav.Link href="/inventory">Inventory</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {userStatus.username !== undefined ? <NavDropdown.Item href='/login' onClick={handleLogoutSubmit} >Logout</NavDropdown.Item> : <NavDropdown.Item href="/login">Login</NavDropdown.Item>}
                            <NavDropdown.Item href="/your_orders"> Your Orders</NavDropdown.Item>
                            </NavDropdown>
                            {userStatus.username !== undefined ? <Nav.Link>You are Logged In as: {userStatus.fullname}</Nav.Link> : null}
                        </Nav>
                    </Col>
                    <Col>
                        <Nav.Link className="form-inline my-2 my-lg-0" href={`/shopping-cart/${userStatus.id}`}>
                            <CartIcon userStatus={userStatus} userCart={userCart} /> Cart
                        </Nav.Link>
                    </Col>
                </Navbar>
                </Row>
        )   
    }

export default Header;
