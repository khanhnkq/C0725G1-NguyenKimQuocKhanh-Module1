import {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {findById, update} from "../../services/customers/CustomerService.js";
import {useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    customerCode: Yup.string().required('Mã khách hàng là bắt buộc'),
    customerName: Yup.string().required('Tên khách hàng là bắt buộc'),
    dateOfBirth: Yup.date().required('Ngày sinh là bắt buộc').max(new Date(), 'Ngày sinh không hợp lệ'),
    gender: Yup.string().required('Giới tính là bắt buộc'),
    idCard: Yup.string().required('CMND là bắt buộc').matches(/^[0-9]{9,12}$/, 'CMND phải có 9-12 chữ số'),
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc').matches(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ'),
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    customerType: Yup.string().required('Loại khách hàng là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc')
});

export default function EditCustomer() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await findById(id);
                setCustomer(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error('Không thể tải thông tin khách hàng');
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const result = await update(id, values);
            if (result) {
                toast.success('Cập nhật khách hàng thành công');
                navigate('/customers');
            } else {
                toast.error('Cập nhật khách hàng thất bại');
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

    if (!customer) {
        return (
            <Container className="my-5">
                <p className="text-center text-danger">Không tìm thấy khách hàng</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="mb-4">Chỉnh sửa thông tin khách hàng</h1>

                    <Formik
                        initialValues={customer}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({isSubmitting}) => (
                            <Form className="card shadow-sm">
                                <div className="card-header bg-warning text-dark">
                                    <h4 className="mb-0">Thông tin khách hàng</h4>
                                </div>

                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Mã khách hàng</label>
                                        <Field name="customerCode" className="form-control" placeholder="VD: KH-001"/>
                                        <ErrorMessage name="customerCode" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Họ và tên</label>
                                        <Field name="customerName" className="form-control" placeholder="Nhập họ tên"/>
                                        <ErrorMessage name="customerName" component="div" className="text-danger"/>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Ngày sinh</label>
                                            <Field name="dateOfBirth" type="date" className="form-control"/>
                                            <ErrorMessage name="dateOfBirth" component="div" className="text-danger"/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Giới tính</label>
                                            <Field as="select" name="gender" className="form-control">
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="text-danger"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">CMND</label>
                                            <Field name="idCard" className="form-control" placeholder="Số CMND"/>
                                            <ErrorMessage name="idCard" component="div" className="text-danger"/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Số điện thoại</label>
                                            <Field name="phoneNumber" className="form-control" placeholder="0901234567"/>
                                            <ErrorMessage name="phoneNumber" component="div" className="text-danger"/>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field name="email" type="email" className="form-control" placeholder="email@example.com"/>
                                        <ErrorMessage name="email" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Loại khách hàng</label>
                                        <Field as="select" name="customerType" className="form-control">
                                            <option value="">Chọn loại khách hàng</option>
                                            <option value="Diamond">Diamond</option>
                                            <option value="Platinum">Platinum</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Silver">Silver</option>
                                            <option value="Member">Member</option>
                                        </Field>
                                        <ErrorMessage name="customerType" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Địa chỉ</label>
                                        <Field name="address" as="textarea" className="form-control" rows="3" placeholder="Nhập địa chỉ"/>
                                        <ErrorMessage name="address" component="div" className="text-danger"/>
                                    </div>
                                </div>

                                <div className="card-footer text-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-2"
                                        onClick={() => navigate('/customers')}
                                    >
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
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

