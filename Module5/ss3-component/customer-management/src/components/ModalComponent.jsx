import {Component} from "react";
import {Button, Modal} from "react-bootstrap";


class  ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<>
            <Modal show={this.props.isShowing} onHide={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to remove {this.props.removeStudent.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.handleRemove}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
    }
}
export default ModalComponent