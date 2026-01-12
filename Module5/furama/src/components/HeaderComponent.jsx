import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HeaderComponent() {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">🏖️ Furama Resort</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">🏠 Trang chủ</Nav.Link>

                        <NavDropdown title="📋 Dịch vụ" id="service-dropdown">
                            <NavDropdown.Item as={Link} to="/services">Danh sách dịch vụ</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/services/add">Thêm dịch vụ</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="👥 Khách hàng" id="customer-dropdown">
                            <NavDropdown.Item as={Link} to="/customers">Danh sách khách hàng</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/customers/add">Thêm khách hàng</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="📝 Hợp đồng" id="contract-dropdown">
                            <NavDropdown.Item as={Link} to="/contracts">Danh sách hợp đồng</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/contracts/add">Tạo hợp đồng</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
