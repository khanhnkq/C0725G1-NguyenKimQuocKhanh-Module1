import {ErrorMessage, Field, Form, Formik} from "formik";
import {FormLabel} from "react-bootstrap";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/authAction.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
export const LoginComponent = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.username);
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        await dispatch(login(values.username, values.password));

    };
    useEffect(() => {
        if (isAuthenticated) {
            toast.success(`Chào mừng ${username}!`);
            navigate("/");
        }
    },[isAuthenticated])




    const validate = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    })

    return (<><Formik
        initialValues={{
            username: "",
            password: ""
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit
        }
        validationSchema={validate}
    >
        <Form className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Login</h4>
                </div>

                <div className="card-body">

                    <div className="mb-3">
                        <FormLabel>Username</FormLabel>
                        <Field name="username" className="form-control" placeholder="Name"/>
                        <ErrorMessage name="username" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <FormLabel>Password</FormLabel>
                        <Field name="password" className="form-control" placeholder="Position"/>
                        <ErrorMessage name="password" component="div" className="text-danger"/>
                    </div>

                </div>

                <div className="card-footer text-end">
                    <button type="submit" className="btn btn-success">
                        Login
                    </button>
                </div>
            </div>
        </Form>

    </Formik></>)
}