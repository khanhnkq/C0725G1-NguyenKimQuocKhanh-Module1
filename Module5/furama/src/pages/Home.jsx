import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <Container fluid className="p-0">
            {/* Carousel Banner */}
            <Carousel className="mb-5">
                <Carousel.Item>
                    <div className="bg-secondary text-white p-5 text-center" style={{ minHeight: '400px' }}>
                        <h2>Khu Nghỉ Dưỡng Paradise</h2>
                        <p>Trải nghiệm đẳng cấp thế giới</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="bg-info text-white p-5 text-center" style={{ minHeight: '400px' }}>
                        <h2>Phòng Hạng Sang</h2>
                        <p>Tiện nghi 5 sao, dịch vụ tuyệt vời</p>
                    </div>
                </Carousel.Item>
            </Carousel>

            <Container className="mt-5">
                {/* Services Section */}
                <Row className="mb-5">
                    <Col md={12} className="text-center mb-4">
                        <h2>Dịch Vụ Chính</h2>
                        <p className="lead">Những tiện nghi và dịch vụ nổi bật</p>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={4} className="mb-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>🏨 Phòng Ở</Card.Title>
                                <Card.Text>Phòng nghỉ cao cấp với view biển tuyệt đẹp, đầy đủ tiện nghi hiện đại.</Card.Text>
                                <Button as={Link} to="/service" variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>🍽️ Nhà Hàng</Card.Title>
                                <Card.Text>Các nhà hàng chuyên phục vụ ẩm thực quốc tế và địa phương.</Card.Text>
                                <Button as={Link} to="/service" variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>💆 Spa & Wellness</Card.Title>
                                <Card.Text>Dịch vụ spa thư giãn với các liệu pháp truyền thống và hiện đại.</Card.Text>
                                <Button as={Link} to="/service" variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={4} className="mb-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>🏊 Bể Bơi</Card.Title>
                                <Card.Text>Bể bơi nước nóng, nước lạnh, bể trẻ em và khu vui chơi nước.</Card.Text>
                                <Button as={Link} to="/service" variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>⚽ Hoạt Động Ngoài Trời</Card.Title>
                                <Card.Text>Các hoạt động thể thao và giải trí: tennis, bóng chuyền, leo núi...</Card.Text>
                                <Button as={Link} to="/service" variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>💼 Hội Thảo & Sự Kiện</Card.Title>
                                <Card.Text>Các phòng hội thảo, tiệc cưới, sự kiện công ty với trang thiết bị hoàn hảo.</Card.Text>
                                <Button as={Link} to="/service" variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* CTA Section */}
                <Row className="bg-light p-5 rounded mb-5">
                    <Col md={12} className="text-center">
                        <h3>Đặt Phòng Ngay</h3>
                        <p>Nhận ưu đãi đặc biệt cho những khách hàng mới</p>
                        <Button variant="success" size="lg">Đặt Phòng</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
