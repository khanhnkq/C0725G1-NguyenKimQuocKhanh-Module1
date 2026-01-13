import { Container, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { create } from "../../services/customers/CustomerService.js";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    code: Yup.string().required('Mã khách hàng là bắt buộc').matches(/^KH-\d{4}$/, "Mã khách hàng phải có định dạng KH-XXXX"),
    name: Yup.string().required('Tên khách hàng là bắt buộc'),
    dob: Yup.date().required('Ngày sinh là bắt buộc').max(new Date(), 'Ngày sinh không hợp lệ'),
    gender: Yup.string().required('Giới tính là bắt buộc'),
    idCard: Yup.string().required('CMND là bắt buộc').matches(/^[0-9]{9,12}$/, 'CMND phải có 9-12 chữ số'),
    phone: Yup.string().required('Số điện thoại là bắt buộc').matches(/^090|091|\d{7}$/, 'Số điện thoại không hợp lệ'),
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    customerType: Yup.string().required('Loại khách hàng là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc')
});

export default function AddCustomer() {
    const navigate = useNavigate();

    const initialValues = {
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formattedValues = {
                ...values,
                gender: values.gender === "True",
                customerType: {
                    id: parseInt(values.customerType)
                }
            };
            console.log(formattedValues);
            const result = await create(formattedValues);
            if (result) {
                toast.success('Thêm khách hàng thành công');
                navigate('/customers');
            } else {
                toast.error('Thêm khách hàng thất bại');
            }
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="mb-4">Thêm khách hàng mới</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="card shadow-sm">
                                <div className="card-header bg-success text-white">
                                    <h4 className="mb-0">Thông tin khách hàng</h4>
                                </div>

                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Mã khách hàng</label>
                                        <Field name="code" className="form-control" placeholder="VD: KH-001" />
                                        <ErrorMessage name="code" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Họ và tên</label>
                                        <Field name="name" className="form-control" placeholder="Nhập họ tên" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Ngày sinh</label>
                                            <Field name="dob" type="date" className="form-control" />
                                            <ErrorMessage name="dob" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Giới tính</label>
                                            <Field as="select" name="gender" className="form-control">
                                                <option value="">Chọn giới tính</option>
                                                <option value="True">Nam</option>
                                                <option value="False">Nữ</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">CMND</label>
                                            <Field name="idCard" className="form-control" placeholder="Số CMND" />
                                            <ErrorMessage name="idCard" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Số điện thoại</label>
                                            <Field name="phone" className="form-control" placeholder="0901234567" />
                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field name="email" type="email" className="form-control" placeholder="email@example.com" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Loại khách hàng</label>
                                        <Field as="select" name="customerType" className="form-control">
                                            <option value="">Chọn loại khách hàng</option>
                                            <option value="1">Diamond</option>
                                            <option value="2">Platinum</option>
                                            <option value="3">Gold</option>
                                        </Field>
                                        <ErrorMessage name="customerType" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Địa chỉ</label>
                                        <Field name="address" as="textarea" className="form-control" rows="3" placeholder="Nhập địa chỉ" />
                                        <ErrorMessage name="address" component="div" className="text-danger" />
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
                                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                        {isSubmitting ? 'Đang lưu...' : 'Lưu'}
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

