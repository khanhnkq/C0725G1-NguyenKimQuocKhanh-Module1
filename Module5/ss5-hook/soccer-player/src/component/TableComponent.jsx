import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {add, findAll, remove} from "../service/SoccerPlayerService.js";
import {DeleteModalComponent} from "./DeleteModalComponent.jsx";
import {AddModalComponent} from "./AddModalComponent.jsx";


export const TableComponent = () => {
    const [soccerPlayer, setSoccerPlayer] = useState([]);
    const [removeSoccerPlayer, setRemoveSoccerPlayer] = useState({
        id: null,
        name: "",
    });
    const [isAddModal, setIsAddModal] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [reload, setReload] = useState(false);
    const [keyword, setKeyword] = useState("");

    const handleShowModal = (removeSoccerPlayer) => {
        setRemoveSoccerPlayer(removeSoccerPlayer);
        setIsShowing(true);
    }
    const handleShowAddModal = () => {
        setIsAddModal(true);
    }
    const handleShowOffAddModal = () => {
        setIsAddModal(false);
    }
    const handleShowOff = () => {
        setIsShowing(false);
    }
    const handleRemoveSoccer = () => {
        remove(removeSoccerPlayer.id)
        setIsShowing(false);
        setReload(true);
    }

    const addSoccer = (soccerPlayer) => {
        add(soccerPlayer);
        setIsAddModal(false);
        console.log(soccerPlayer);
    }
    useEffect(() => {
        setSoccerPlayer(findAll());
        setReload(false);
    }, [reload])
    return (<>
        <div className="d-flex gap-2">
            <input
                type="text"
                className="form-control"
                placeholder="Tìm theo mã, tên, vị trí..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

        </div>
        <Button onClick={() => handleShowAddModal()}>Thêm cầu thủ</Button>
        <div className={'mb-2'}></div>
        <Table border="1" cellPadding="8" cellSpacing="0">
            <thead>
            <tr>
                <th>ID</th>
                <th>Mã cầu thủ</th>
                <th>Tên</th>
                <th>Ngày sinh</th>
                <th>Giá trị chuyển nhượng (€)</th>
                <th>Vị trí</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {soccerPlayer.filter((user) =>
                user.name.toLowerCase().includes(keyword.toLowerCase()) ||
                user.code.toLowerCase().includes(keyword.toLowerCase()) ||
                user.position.toLowerCase().includes(keyword.toLowerCase())
            ).map(player => (
                <tr key={player.id}>
                    <td>{player.id}</td>
                    <td>{player.code}</td>
                    <td>{player.name}</td>
                    <td>{player.birthDate}</td>
                    <td>{player.transferValue.toLocaleString()}</td>
                    <td>{player.position}</td>
                    <td><Button onClick={() => handleShowModal(player)}>Xóa cầu thủ</Button></td>
                </tr>
            ))}
            </tbody>
        </Table>
        <DeleteModalComponent handleShowOff={handleShowOff}
                              removeSoccerPlayer={removeSoccerPlayer}
                              isShowing={isShowing}
                              handleRemove={handleRemoveSoccer}/>
        <AddModalComponent isAddModal={isAddModal}
                           showOffAddModal={handleShowOffAddModal}
                           addSoccer={addSoccer}/>
    </>)
}