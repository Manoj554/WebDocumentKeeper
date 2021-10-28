import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';

const Header = () => {

    const islogin = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(signout());
    }

    const userLogin = (name) => {
        return (
            <Nav>
                {/* <li className="nav-Items" key="2">
                    <i className="fa fa-user nav-link" aria-hidden="true" style={{fontSize:'1.1rem'}}> {name}</i>
                </li> */}
                <li className="nav-Items" key="3">
                    <span className="nav-link" onClick={logout} style={{cursor:'pointer'}} >Signout</span>
                </li>
            </Nav>
        )
    }

    const usernotlogin = () => {
        return (
            <Nav>
                <li className="nav-Items" key="2">
                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                </li>
                <li className="nav-Items" key="3">
                    <NavLink className="nav-link" to="/signin">Signin</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
                <Container fluid>
                <Navbar.Brand>Web-Document-Keeper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <li className="nav-Items" key="0">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-Items" key="1">
                                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li className="nav-Items" key="4">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                        </Nav>
                        {islogin.authenticate ? 
                            userLogin(islogin.userName)
                            :
                            usernotlogin()
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
