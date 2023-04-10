import React, { Component } from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import CartIcon from "./CartIcon";


function Header({userStatus, setUser}){


        function handleLogOut(){
            setUser({})
          }

        function handleLogoutSubmit(){
            fetch('/logout', {
                method: 'Delete',
            }).then(() => handleLogOut());
        }
        if (userStatus.username !== undefined){
            console.log(userStatus.username)
        }

        return (
            <div>
                <Navbar bg="transparent" expand="xl">
                        <Navbar.Brand href="#home">WineFetcher</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/inventory">Inventory</Nav.Link>
                            <Nav.Link href="/item-details">Item Details</Nav.Link>
                            
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {/* <NavDropdown.Item href="/login">Login</NavDropdown.Item>  */}
                            {userStatus.username !== undefined ? <NavDropdown.Item onClick={handleLogoutSubmit} >Logout</NavDropdown.Item> : <NavDropdown.Item href="/login">Login</NavDropdown.Item>}
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                            </NavDropdown>
                            {userStatus.username !== undefined ? <Nav.Link>You are Logged In as: {userStatus.username}</Nav.Link> : null}
                        </Nav>
                        <Nav.Link className="form-inline my-2 my-lg-0" href="/shopping-cart">
                            <CartIcon /> Cart
                        </Nav.Link>
                        </Navbar.Collapse>
                </Navbar>
            </div>
        )   
    }

export default Header;
