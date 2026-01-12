import * as Yup from "yup";
import {useEffect, useState} from "react";
import {findAll} from "../../services/services/ExtraServicesService.js";
import {Button, Col, Container, FormLabel, Row} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {add} from "../../services/services/FacilityService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const validationSchema = Yup.object({
    serviceName: Yup.string().required('Tên dịch vụ là bắt buộc').matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Chỉ được nhập chữ cái'),
    type: Yup.string().required('Loại là bắt buộc'),
    usableArea: Yup.number().required('Diện tích là bắt buộc').positive('Diện tích phải > 0'),
    maxPeople: Yup.number().required('Số người là bắt buộc').positive('Số người phải > 0'),
    rentalCost: Yup.number().required('Giá thuê là bắt buộc').positive('Giá thuê phải > 0'),
    rentType: Yup.string().required('Loại thuê là bắt buộc'),
    roomStandard: Yup.string(),
    image: Yup.string().required('URL không hợp lệ')
})
export const AddServiceComponent = () => {


    const [extraServices, setExtraServices] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        console.log('Form submitted with values:', values)
        try {
            const extraServiceIds = [...values.extraServiceIds.map(Number)]
            const selectedExtraServices = extraServices.filter(es => values.extraServiceIds.includes(es.id));
            const submitData = {
                ...values,                              // Lấy tất cả từ form
                extraServiceIds,   // Thêm array of objects
                extraServices: selectedExtraServices  // Giữ array of IDs
            };

            // Bước 3: Gửi submitData MỚI lên server
            const result = await add(submitData);
            if (result) {
                toast.success("Thêm dịch vụ thành công")
                navigate("/services");
            } else {
                toast.error("Thêm dịch vụ thất bại")
                navigate("/services");
            }

        } catch (e) {
            console.log(e)
            toast.error("Thêm dịch vụ thất bại")
        }
    }
    useEffect(() => {

        const fetchService = async () => {
            try {
                const extraServiceData = await findAll();
                setExtraServices(extraServiceData);
            } catch (e) {
                console.log(e)
            }
        }
        fetchService()
    }, [])
    return (<Container className="my-5">
        <Row className="justify-content-center">
            <Col md={8}>
                <h1 className="mb-4">Thêm dịch vụ</h1>

                <Formik
                    initialValues={{}}
                    enableReinitialize={true}
                    onSubmit={handleSubmit
                    }
                    validationSchema={validationSchema}
                >
                    <Form className="container mt-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Thêm thông tin dịch vụ</h4>
                            </div>

                            <div className="card-body">
                                <div className={'mb-3'}>
                                    <FormLabel>Loại dịch vụ</FormLabel>
                                    <Field as={'select'} className="form-control" name={'type'}>
                                        <option value={""}>Select</option>
                                        <option value={'VILLA'}> VILLA</option>
                                        <option value={'HOUSE'}>HOUSE</option>
                                        <option value={'ROOM'}>ROOM</option>
                                    </Field>
                                    <ErrorMessage name={'type'} component="div" className="text-danger"/>
                                </div>

                                <div className="mb-3">
                                    <FormLabel>Tên dịch vụ</FormLabel>
                                    <Field name="serviceName" className="form-control" placeholder="Tên dịch vụ"/>
                                    <ErrorMessage name="serviceName" component="div" className="text-danger"/>
                                </div>

                                <div className="mb-3">
                                    <FormLabel>Diện tích</FormLabel>
                                    <Field name="usableArea" type="number" className="form-control"/>
                                    <ErrorMessage name="usableArea" component="div" className="text-danger"/>
                                </div>

                                <div className="mb-3">
                                    <FormLabel>Giá thuê </FormLabel>
                                    <Field name="rentalCost" type="number" className="form-control"/>
                                    <ErrorMessage name="rentalCost" component="div" className="text-danger"/>
                                </div>

                                <div className="mb-3">
                                    <FormLabel>Số người tối da</FormLabel>
                                    <Field name="maxPeople" type="number" className="form-control"
                                           placeholder="Position"/>
                                    <ErrorMessage name="maxPeople" component="div" className="text-danger"/>
                                </div>
                                <div className={'mb-3'}>
                                    <FormLabel>Thuê theo:</FormLabel>
                                    <Field as={'select'} className="form-control" name={'rentType'}>
                                        <option value={""}>Select</option>
                                        <option value={'day'}> Ngày</option>
                                        <option value={'month'}>Tháng</option>
                                        <option value={'year'}>Năm</option>
                                    </Field>
                                    <ErrorMessage name={'rentType'} component="div" className="text-danger"/>
                                </div>
                                <div className="mb-3">
                                    <FormLabel>Tiêu chuẩn dịch vụ</FormLabel>
                                    <Field name="roomStandard" className="form-control" placeholder="Tiêu chuẩn"/>
                                    <ErrorMessage name="roomStandard" component="div" className="text-danger"/>
                                </div>
                                <div className="mb-3">
                                    <FormLabel>Tiện nghi khác</FormLabel>
                                    <Field name="otherAmenities" className="form-control"
                                           placeholder="Tiện nghi khác"/>
                                </div>
                                <div className="mb-3">
                                    <FormLabel>Diện tích hồ bơi</FormLabel>
                                    <Field name="poolArea" type={'number'} className="form-control"
                                           placeholder="Diện tích hồ bơi"/>
                                </div>
                                <div className="mb-3">
                                    <FormLabel>Số tầng</FormLabel>
                                    <Field name="floors" type={'number'} className="form-control"
                                           placeholder="Số tầng"/>
                                </div>
                                <div className={'mb-3'}>
                                    <FormLabel>Dịch vụ đi kèm</FormLabel>
                                    {extraServices.map((extraService) => (
                                        <div key={extraService.id} className="form-check mb-2">
                                            <Field
                                                type="checkbox"
                                                name="extraServiceIds"
                                                value={String(extraService.id)}
                                                className="form-check-input"
                                                id={`extra-${extraService.id}`}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`extra-${extraService.id}`}
                                            >
                                                <div>
                                                    <strong>{extraService.serviceName}</strong>
                                                    <div className="text-muted small">
                                                        {extraService.price.toLocaleString('vi-VN')}đ
                                                        / {extraService.unit}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="mb-3">
                                    <FormLabel >Dịch vụ miễn phí</FormLabel>
                                    <Field name="freeService" className="form-control"
                                           placeholder="Dịch vụ miễn phí"/>
                                </div>
                                <div className="mb-3">
                                    <FormLabel>URL hình ảnh</FormLabel>
                                    <Field name="image" className="form-control" placeholder="URL hình ảnh"/>
                                </div>
                            </div>

                            <div className="card-footer text-end">
                                <Button type="submit" className="btn btn-success">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Form>

                </Formik>
            </Col>
        </Row>
    </Container>)
}