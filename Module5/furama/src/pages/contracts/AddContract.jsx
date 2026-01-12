import {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {create} from "../../services/contracts/ContractService.js";
import {getAll as getAllCustomers} from "../../services/customers/CustomerService.js";
import {getAll as getAllServices} from "../../services/services/FacilityService.js";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    contractCode: Yup.string().required('Mã hợp đồng là bắt buộc'),
    customerId: Yup.string().required('Khách hàng là bắt buộc'),
    serviceId: Yup.string().required('Dịch vụ là bắt buộc'),
    startDate: Yup.date().required('Ngày bắt đầu là bắt buộc'),
    endDate: Yup.date()
        .required('Ngày kết thúc là bắt buộc')
        .min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu'),
    deposit: Yup.number()
        .required('Tiền đặt cọc là bắt buộc')
        .min(0, 'Tiền đặt cọc phải >= 0'),
    totalAmount: Yup.number()
        .required('Tổng tiền là bắt buộc')
        .min(0, 'Tổng tiền phải >= 0'),
    status: Yup.string().required('Trạng thái là bắt buộc')
});

export default function AddContract() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customerData, serviceData] = await Promise.all([
                    getAllCustomers(1, 100),
                    getAllServices(1, 100)
                ]);
                setCustomers(customerData.data);
                setServices(serviceData.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error('Không thể tải dữ liệu');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const initialValues = {
        contractCode: '',
        customerId: '',
        customerName: '',
        serviceId: '',
        serviceName: '',
        startDate: '',
        endDate: '',
        deposit: '',
        totalAmount: '',
        status: 'Chờ xác nhận'
    };

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const selectedCustomer = customers.find(c => c.id === values.customerId);
            const selectedService = services.find(s => s.id === values.serviceId);

            const contractData = {
                ...values,
                customerName: selectedCustomer?.customerName || '',
                serviceName: selectedService?.serviceName || ''
            };

            const result = await create(contractData);
            if (result) {
                toast.success('Tạo hợp đồng thành công');
                navigate('/contracts');
            } else {
                toast.error('Tạo hợp đồng thất bại');
            }
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container className="my-5">
                <p className="text-center">Đang tải...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="mb-4">Tạo hợp đồng mới</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting, values, setFieldValue}) => (
                            <Form className="card shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="mb-0">Thông tin hợp đồng</h4>
                                </div>

                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Mã hợp đồng</label>
                                        <Field name="contractCode" className="form-control" placeholder="VD: HD-001"/>
                                        <ErrorMessage name="contractCode" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Khách hàng</label>
                                        <Field as="select" name="customerId" className="form-control">
                                            <option value="">Chọn khách hàng</option>
                                            {customers.map(customer => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.customerCode} - {customer.customerName} - {customer.phoneNumber}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="customerId" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Dịch vụ</label>
                                        <Field
                                            as="select"
                                            name="serviceId"
                                            className="form-control"
                                            onChange={(e) => {
                                                const serviceId = e.target.value;
                                                setFieldValue('serviceId', serviceId);
                                                const selectedService = services.find(s => s.id === serviceId);
                                                if (selectedService) {
                                                    setFieldValue('totalAmount', selectedService.rentalCost);
                                                }
                                            }}
                                        >
                                            <option value="">Chọn dịch vụ</option>
                                            {services.map(service => (
                                                <option key={service.id} value={service.id}>
                                                    {service.serviceName} - {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(service.rentalCost)}/{service.rentType === 'day' ? 'Ngày' : service.rentType === 'month' ? 'Tháng' : 'Năm'}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="serviceId" component="div" className="text-danger"/>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Ngày bắt đầu</label>
                                            <Field name="startDate" type="date" className="form-control"/>
                                            <ErrorMessage name="startDate" component="div" className="text-danger"/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Ngày kết thúc</label>
                                            <Field name="endDate" type="date" className="form-control"/>
                                            <ErrorMessage name="endDate" component="div" className="text-danger"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Tiền đặt cọc (VNĐ)</label>
                                            <Field name="deposit" type="number" className="form-control" placeholder="0"/>
                                            <ErrorMessage name="deposit" component="div" className="text-danger"/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Tổng tiền (VNĐ)</label>
                                            <Field name="totalAmount" type="number" className="form-control" placeholder="0"/>
                                            <ErrorMessage name="totalAmount" component="div" className="text-danger"/>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Trạng thái</label>
                                        <Field as="select" name="status" className="form-control">
                                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                                            <option value="Đang thực hiện">Đang thực hiện</option>
                                            <option value="Đã thanh toán">Đã thanh toán</option>
                                            <option value="Đã hủy">Đã hủy</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="text-danger"/>
                                    </div>

                                    {values.serviceId && values.startDate && values.endDate && (
                                        <div className="alert alert-info">
                                            <strong>📋 Thông tin tóm tắt:</strong><br/>
                                            Khách hàng: {customers.find(c => c.id === values.customerId)?.customerName || 'Chưa chọn'}<br/>
                                            Dịch vụ: {services.find(s => s.id === values.serviceId)?.serviceName || 'Chưa chọn'}<br/>
                                            Thời gian: {new Date(values.startDate).toLocaleDateString('vi-VN')} - {new Date(values.endDate).toLocaleDateString('vi-VN')}
                                        </div>
                                    )}
                                </div>

                                <div className="card-footer text-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-2"
                                        onClick={() => navigate('/contracts')}
                                    >
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Đang tạo...' : 'Tạo hợp đồng'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

