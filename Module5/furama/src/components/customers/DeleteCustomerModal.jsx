import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function DeleteCustomerModal({show, onHide, customer, onConfirm}) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>Xác nhận xóa khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {customer && (
                    <div>
                        <p className="mb-2">
                            Bạn có chắc chắn muốn xóa khách hàng sau không?
                        </p>
                        <div className="alert alert-warning">
                            <strong>Mã khách hàng:</strong> {customer.customerCode}<br/>
                            <strong>Tên khách hàng:</strong> {customer.customerName}<br/>
                            <strong>Email:</strong> {customer.email}<br/>
                            <strong>Số điện thoại:</strong> {customer.phoneNumber}
                        </div>
                        <p className="text-danger mb-0">
                            <small>⚠️ Hành động này không thể hoàn tác!</small>
                        </p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

DeleteCustomerModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    customer: PropTypes.object,
    onConfirm: PropTypes.func.isRequired
};

