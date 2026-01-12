
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Container, Row, Col } from 'react-bootstrap'

export default function FooterComponent() {
    return (
        <footer className="bg-dark text-white mt-5 py-4">
            <Container fluid>
                <Row>
                    <Col md={4} className="mb-3">
                        <h5>Về chúng tôi</h5>
                        <p>Đây là trang web của chúng tôi với các dịch vụ tuyệt vời.</p>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5>Liên kết</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Trang chủ</a></li>
                            <li><a href="/about" className="text-white text-decoration-none">Về chúng tôi</a></li>
                            <li><a href="/contact" className="text-white text-decoration-none">Liên hệ</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5>Theo dõi</h5>
                        <div className="social-links">
                            <a href="#" className="text-white text-decoration-none me-3">Facebook</a>
                            <a href="#" className="text-white text-decoration-none me-3">Twitter</a>
                            <a href="#" className="text-white text-decoration-none">Instagram</a>
                        </div>
                    </Col>
                </Row>
                <hr className="bg-white" />
                <div className="text-center">
                    <p>&copy; 2024 My Website. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    )
}

