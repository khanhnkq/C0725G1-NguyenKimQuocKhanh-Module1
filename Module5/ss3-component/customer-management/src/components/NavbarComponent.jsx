import {Component} from "react";
import {Nav, Container} from "react-bootstrap";

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<>
            <NavbarComponent bg="dark" data-bs-theme="dark">
                <Container>
                    <NavbarComponent.Brand href="#home">Navbar</NavbarComponent.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </NavbarComponent>
            <br />
            <NavbarComponent bg="primary" data-bs-theme="dark">
                <Container>
                    <NavbarComponent.Brand href="#home">Navbar</NavbarComponent.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </NavbarComponent>

            <br />
            <NavbarComponent bg="light" data-bs-theme="light">
                <Container>
                    <NavbarComponent.Brand href="#home">Customer Management</NavbarComponent.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </NavbarComponent>
        </>)
    }
}
export default NavbarComponent;