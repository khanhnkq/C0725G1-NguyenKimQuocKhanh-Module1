import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {getAll, removeById} from "../service/customerService.js";
import ModalComponent from "./ModalComponent.jsx";
import Table from 'react-bootstrap/Table';

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerList: [],
            isShowing: false,
            removeStudent: {}
        }
    }

    componentDidMount() {
        this.setState({
            customerList: [...getAll()]
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.isShowing!==this.state.isShowing){
            this.setState({
                customerList:[...getAll()]
            })
        }
    }

    handleShowModal = (student) => {
        this.setState({
            isShowing: true,
            removeStudent: student
        })
    }

    handleRemoveStudent = (student) => {
        removeById(student.id)
        this.setState({
            isShowing: false,
        })
    }

    handleCloseModal = () => {
        this.setState({
            isShowing: false
        })
    }

    render() {
        return (
            <>   {console.log("--------list render---------")}
                <h1>Danh sách khách hàng</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>CODE</th>
                        <th>NAME</th>
                        <th>ADDRESS</th>
                        <th>TYPE</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.customerList.map((s, i) =>
                            <tr key={i}>
                                <td>{s.id}</td>
                                <td>{s.code}</td>
                                <td>{s.name}</td>
                                <td>{s.address}</td>
                                <td>{s.type}</td>
                                <td>
                                    <button className={'btn btn-danger btn-sm'} onClick={() => {
                                        this.handleShowModal(s);
                                    }}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>

                </Table>
                <ModalComponent
                    isShowing={this.state.isShowing}
                    removeStudent={this.state.removeStudent}
                    handleClose={this.handleCloseModal}
                    handleRemove={this.handleRemoveStudent}
                />
            </>
        )
    }
}

export default TableComponent
