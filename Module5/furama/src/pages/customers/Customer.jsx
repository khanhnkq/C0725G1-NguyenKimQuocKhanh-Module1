import {useEffect, useState} from "react";
import {Container, Table, Button, Pagination, Form, InputGroup, Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getAll, deleteById} from "../../services/customers/CustomerService.js";
import DeleteCustomerModal from "../../components/customers/DeleteCustomerModal.jsx";
import toast from "react-hot-toast";

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const limit = 6;

    const fetchCustomers = async () => {
        const data = await getAll(page, limit);
        setCustomers(data.data);
        setTotalPages(data.pages);
    };

    useEffect(() => {
        fetchCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const filtered = customers.filter(customer =>
            customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phoneNumber.includes(searchTerm)
        );
        setFilteredCustomers(filtered);
    }, [searchTerm, customers]);

    const handleDeleteClick = (customer) => {
        setSelectedCustomer(customer);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedCustomer) {
            const result = await deleteById(selectedCustomer.id);
            if (result) {
                toast.success("Xóa khách hàng thành công");
                setShowDeleteModal(false);
                setSelectedCustomer(null);
                fetchCustomers();
            } else {
                toast.error("Xóa khách hàng thất bại");
            }
        }
    };

    const displayCustomers = searchTerm ? filteredCustomers : customers;

    const getCustomerTypeBadge = (type) => {
        const variants = {
            'Diamond': 'primary',
            'Platinum': 'info',
            'Gold': 'warning',
            'Silver': 'secondary',
            'Member': 'success'
        };
        return <Badge bg={variants[type] || 'secondary'}>{type}</Badge>;
    };

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Danh sách khách hàng</h1>
                <Link to="/customers/add">
                    <Button variant="success">
                        ➕ Thêm khách hàng
                    </Button>
                </Link>
            </div>

            <div className="mb-4">
                <InputGroup style={{maxWidth: '500px'}}>
                    <InputGroup.Text>🔍</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo tên, mã, email hoặc số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>STT</th>
                    <th>Mã KH</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>CMND</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Loại khách</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {displayCustomers.length > 0 ? (
                    displayCustomers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{(page - 1) * limit + index + 1}</td>
                            <td>{customer.customerCode}</td>
                            <td>{customer.customerName}</td>
                            <td>{new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')}</td>
                            <td>{customer.gender}</td>
                            <td>{customer.idCard}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.email}</td>
                            <td>{getCustomerTypeBadge(customer.customerType)}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Link to={`/customers/edit/${customer.id}`}>
                                        <Button variant="warning" size="sm">
                                            ✏️ Sửa
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(customer)}
                                    >
                                        🗑️ Xóa
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="10" className="text-center text-muted">
                            Không tìm thấy khách hàng nào
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

            <DeleteCustomerModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                customer={selectedCustomer}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
}

