import {useState, useEffect, useCallback} from "react";
import {findById} from "../service/SoccerPlayerService.js";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const DetailComponent = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState({
        id: 0,
        code: "",
        name: "",
        birthDate: "",
        transferValue: 0,
        position: ""
    });

    const getData = async () => {
        const soccerPlayer = await findById(id);
        setDetail(soccerPlayer);
    }
    useEffect(() => {
        getData()
    }, []);
    const navigateHome = useNavigate()
    const onButtonClick = useCallback(() => {
        navigateHome("/");
    }, [navigateHome]);


    return (<>

        <div className="container mt-4">
            <div className={'row mb-3'}>
                <div className={'col-2'}>
                    <Button className={'btn btn-primary btn-md'} onClick={onButtonClick}>Quay lại</Button></div>
            </div>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Player Detail</h4>
                </div>

                <div className="card-body">

                    <div className="row mb-2">
                        <div className="col-4 fw-bold">Code:</div>
                        <div className="col-8">{detail.code}</div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-4 fw-bold">Name:</div>
                        <div className="col-8">{detail.name}</div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-4 fw-bold">Date of Birth:</div>
                        <div className="col-8">{detail.birthDate}</div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-4 fw-bold">Transfer Value:</div>
                        <div className="col-8">{detail.transferValue}</div>
                    </div>

                    <div className="row">
                        <div className="col-4 fw-bold">Position:</div>
                        <div className="col-8">{detail.position}</div>
                    </div>
                </div>
            </div>
        </div>


    </>)
}
export default DetailComponent

