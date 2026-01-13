import { useEffect, useState } from "react";
import { Container, Row, Col, Pagination, InputGroup, Form } from "react-bootstrap";
import ServiceCardComponent from "../../components/services/ServiceCardComponent.jsx";
import { removeById, getAll } from "../../services/services/FacilityService.js";


import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Service() {
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("ALL");
    const limit = 6;
    const navigate = useNavigate();



    const handleDelete = async (id) => {
        const result = await removeById(id);
        if (result) {
            toast.success("Xóa dịch vụ thành công");
            navigate("/services");
            // Refresh the list
            const data = await getAll(page, limit);
            setServices(data.content);
            setTotalPages(data.totalPages);
        } else toast.error("Xóa dịch vụ thất bại");
    }

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getAll(page, limit);
            setServices(data.content);
            setTotalPages(data.totalPages);
        }
        fetchServices()
    }, [page]);
    //filtering
    const displayServices = services.filter(s => {
        const matchType = type === "ALL" || s.type === type;
        const matchSearch =
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.roomStandard?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchType && matchSearch;
    });

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Danh sách dịch vụ</h1>
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <InputGroup>
                        <InputGroup.Text>🔍</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc loại dịch vụ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={4} className="mx-auto">
                    <InputGroup>
                        <InputGroup.Text>Loại dịch vụ</InputGroup.Text>
                        <Form.Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="ALL">Tất cả</option>
                            <option value="VILLA">Villa</option>
                            <option value="HOUSE">House</option>
                            <option value="ROOM">Room</option>
                        </Form.Select>
                    </InputGroup>

                </Col>
            </Row>
            <Row>
                {displayServices.length > 0 ? (
                    displayServices.map(s => (
                        <Col md={4} className="mb-4" key={s.id}>
                            <ServiceCardComponent
                                id={s.id}
                                icon={s.type === "VILLA" ? "🏠" : s.type === "HOUSE" ? "🏡" : "🛏️"}
                                title={s.name}
                                description={`${s.usableArea}m² • ${s.maxPeople} người`}
                                price={new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND"
                                }).format(s.rentalCost)}
                                image={s.image}
                                handleDelete={handleDelete}
                            />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <p className="text-muted">Không tìm thấy dịch vụ nào</p>
                    </Col>
                )}
            </Row>
            {!searchTerm && (
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    />

                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                            key={i}
                            active={page === i + 1}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    />
                </Pagination>
            )}
        </Container>
    );
}
