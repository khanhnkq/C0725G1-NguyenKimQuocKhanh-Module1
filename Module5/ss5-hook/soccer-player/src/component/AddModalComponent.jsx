import {useState} from "react";
import {add} from "../service/SoccerPlayerService.js";

export const AddModalComponent = ({isAddModal, showOffAddModal, addSoccer}) => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        birthDate: "",
        transferValue: "",
        position: ""
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        addSoccer({
            ...formData, id: Date.now(),
            transferValue: Number(formData.transferValue)
        });
        setFormData({
            code: "",
            name: "",
            birthDate: "",
            transferValue: "",
            position: ""
        })
    }
    if (!isAddModal) {
        return null
    }
    return (<>
        <div
            className="modal show d-block"
            style={{backgroundColor: "rgba(0,0,0,0.5)"}}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thêm cầu thủ</h5>
                        <button className="btn-close" onClick={showOffAddModal}></button>
                    </div>

                    <div className="modal-body">
                        <input
                            className="form-control mb-2"
                            placeholder="Mã cầu thủ"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                        />
                        <input
                            className="form-control mb-2"
                            placeholder="Tên cầu thủ"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            className="form-control mb-2"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Giá trị chuyển nhượng"
                            name="transferValue"
                            value={formData.transferValue}
                            onChange={handleChange}
                        />
                        <input
                            className="form-control"
                            placeholder="Vị trí (ST, GK...)"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={showOffAddModal}>
                            Hủy
                        </button>
                        <button className="btn btn-primary" onClick={()=>handleSubmit()}>
                            Thêm
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </>)
}