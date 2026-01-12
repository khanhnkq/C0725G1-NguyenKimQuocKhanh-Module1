import {useEffect, useState} from "react";
import {Container, Table, Button, Pagination, Form, InputGroup, Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getAll} from "../../services/contracts/ContractService.js";

export default function Contract() {
    const [contracts, setContracts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredContracts, setFilteredContracts] = useState([]);

    const limit = 6;

    const fetchContracts = async () => {
        const data = await getAll(page, limit);
        setContracts(data.data);
        setTotalPages(data.pages);
    };

    useEffect(() => {
        fetchContracts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const filtered = contracts.filter(contract =>
            contract.contractCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContracts(filtered);
    }, [searchTerm, contracts]);

    const displayContracts = searchTerm ? filteredContracts : contracts;

    const getStatusBadge = (status) => {
        const statusVariants = {
            'Đã thanh toán': 'success',
            'Đang thực hiện': 'primary',
            'Chờ xác nhận': 'warning',
            'Đã hủy': 'danger'
        };
        return <Badge bg={statusVariants[status] || 'secondary'}>{status}</Badge>;
    };

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Danh sách hợp đồng</h1>
                <Link to="/contracts/add">
                    <Button variant="primary">
                        ➕ Tạo hợp đồng
                    </Button>
                </Link>
            </div>

            <div className="mb-4">
                <InputGroup style={{maxWidth: '500px'}}>
                    <InputGroup.Text>🔍</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo mã, tên khách hàng hoặc dịch vụ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>STT</th>
                    <th>Mã hợp đồng</th>
                    <th>Khách hàng</th>
                    <th>Dịch vụ</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Đặt cọc</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                {displayContracts.length > 0 ? (
                    displayContracts.map((contract, index) => (
                        <tr key={contract.id}>
                            <td>{(page - 1) * limit + index + 1}</td>
                            <td>
                                <strong>{contract.contractCode}</strong>
                            </td>
                            <td>{contract.customerName}</td>
                            <td>{contract.serviceName}</td>
                            <td>{new Date(contract.startDate).toLocaleDateString('vi-VN')}</td>
                            <td>{new Date(contract.endDate).toLocaleDateString('vi-VN')}</td>
                            <td className="text-end">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(contract.deposit)}
                            </td>
                            <td className="text-end">
                                <strong>
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(contract.totalAmount)}
                                </strong>
                            </td>
                            <td>{getStatusBadge(contract.status)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="text-center text-muted">
                            Không tìm thấy hợp đồng nào
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {!searchTerm && (
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    />

                    {Array.from({length: totalPages}, (_, i) => (
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

            <div className="mt-4 p-3 bg-light rounded">
                <h5>📊 Thống kê:</h5>
                <p className="mb-1">Tổng số hợp đồng: <strong>{contracts.length}</strong></p>
                <p className="mb-1">
                    Đã thanh toán: <Badge bg="success">{contracts.filter(c => c.status === 'Đã thanh toán').length}</Badge>
                    {' '}
                    Đang thực hiện: <Badge bg="primary">{contracts.filter(c => c.status === 'Đang thực hiện').length}</Badge>
                    {' '}
                    Chờ xác nhận: <Badge bg="warning">{contracts.filter(c => c.status === 'Chờ xác nhận').length}</Badge>
                </p>
            </div>
        </Container>
    );
}

