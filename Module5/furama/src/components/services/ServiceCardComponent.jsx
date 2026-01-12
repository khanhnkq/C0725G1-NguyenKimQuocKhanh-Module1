import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {DeleteModalComponent} from "./DeleteModalComponent.jsx";
import {useState} from "react";

export default function ServiceCardComponent({icon, title, description, price, image, id,handleDelete}) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <Card className="h-100 shadow-sm border-0 hover-shadow" style={{transition: 'transform 0.2s'}}>
            {image && (
                <Card.Img variant="top" src={image} style={{height: '200px', objectFit: 'cover'}}/>
            )}
            <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                    <span style={{fontSize: '1.5em'}}>{icon}</span>
                    {title}
                </Card.Title>
                <Card.Text className="text-muted">{description}</Card.Text>
                {price && <p className="text-success fw-bold mb-3">{price}</p>}
                <div className={'d-flex justify-content-between align-items-center'}>
                    <Button as={Link} to={`edit/${id}`} variant="primary btn-sm" className="w-100">
                        Sửa dịch vụ
                    </Button>
                    <Button onClick={handleShow}  variant="danger btn-sm" className="w-100">
                        Xóa
                    </Button>
                </div>

            </Card.Body>
            <DeleteModalComponent id={id} title={title} show={show} handleShow={handleShow} handleClose={handleClose} handleDelete={handleDelete} />
        </Card>
    )
}
