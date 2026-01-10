import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {use} from "react";
import {logout} from "../redux/actions/authAction.js";

function NavbarComponent() {
    const user = useSelector((state) => state.username);
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                        <Nav.Link as={Link} to={'soccerplayer/add'}>Add</Nav.Link>
                        {isAuthenticated &&(<Nav.Link onClick={handleLogout}>Logout</Nav.Link>)}
                        {!isAuthenticated &&(<Nav.Link as={Link} to={'soccerplayer/login'}>Login</Nav.Link>)}
                        {isAuthenticated &&<Nav.Link>Hello{user}</Nav.Link> }


                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;