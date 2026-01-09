import {ErrorMessage, Field, Form, Formik} from "formik";
import {FormLabel} from "react-bootstrap";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {findById, update} from "../service/SoccerPlayerService.js";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {findAll} from "../service/ClubService.js";


const UpdateComponent = () => {

    const [club, setClub] = useState([]);

    const [newPlayers, setNewPlayers] = useState({
        id: "",
        code: "",
        club: {},
        name: "",
        birthDate: "",
        transferValue: 0,
        position: ""
    });
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const club = await findAll();
            setClub(prevState => club.data)
            console.log(club)
        }
        fetchData();
    }, [])
    const handleSubmit = async (value) => {
        value = {...value, club: JSON.parse(value.club)}
        await update(id, value)
        toast.success('Updated successfully !')
        navigate("/");
    }

    const loadData = async () => {
        let res = await findById(id)
        console.log(res)
        res = {...res, club: JSON.stringify(res.club)}
        setNewPlayers(res);
    }

    useEffect(() => {
        loadData()
    }, [id])

    const validate = Yup.object({
            name: Yup.string().required("Name is required"),
            birthDate: Yup.date().required("Birthday is required"),
            transferValue: Yup.number().required("TransferValue is required"),
            position: Yup.string().required("Position is required"),
        }
    )
    return (<>
        <Formik
            initialValues={newPlayers}
            enableReinitialize={true}
            onSubmit={handleSubmit
            }
            validationSchema={validate}
        >
            <Form className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Add Player</h4>
                    </div>

                    <div className="card-body">

                        <div className="mb-3">
                            <FormLabel>Code</FormLabel>
                            <Field readOnly name="code" className="form-control" placeholder="Code"/>
                            <ErrorMessage name="code" component="div" className="text-danger"/>
                        </div>
                        <div className={'mb-3'}>
                            <FormLabel>Club</FormLabel>
                            <Field as={'select'} className="form-control" name={'club'}>
                                <option>Select</option>
                                {club.map(club => (
                                    <option key={club.id} value={JSON.stringify(club)}>{club.name}</option>))}
                            </Field>
                        </div>

                        <div className="mb-3">
                            <FormLabel>Name</FormLabel>
                            <Field name="name" className="form-control" placeholder="Name"/>
                            <ErrorMessage name="name" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <FormLabel>Date of Birth</FormLabel>
                            <Field name="birthDate" type="date" className="form-control"/>
                            <ErrorMessage name="birthDate" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <FormLabel>Transfer Value</FormLabel>
                            <Field name="transferValue" type="number" className="form-control"/>
                            <ErrorMessage name="transferValue" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <FormLabel>Position</FormLabel>
                            <Field name="position" className="form-control" placeholder="Position"/>
                            <ErrorMessage name="position" component="div" className="text-danger"/>
                        </div>

                    </div>

                    <div className="card-footer text-end">
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </div>
                </div>
            </Form>

        </Formik>
    </>)
}
export default UpdateComponent;