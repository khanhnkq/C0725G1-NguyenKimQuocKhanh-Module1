import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {findAll, remove} from "../service/SoccerPlayerService.js";
import {DeleteModalComponent} from "./DeleteModalComponent.jsx";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import {Layout, Pagination} from 'antd';
import {useSelector} from "react-redux";


export const TableComponent = () => {
    const username = useSelector(state => state.username)
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const [soccerPlayer, setSoccerPlayer] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        "first": 0,
        "prev": null,
        "next": 0,
        "last": 0,
        "pages": 0,
        "items": 0
    });
    const [removeSoccerPlayer, setRemoveSoccerPlayer] = useState({
        id: null,
        name: "",
    });
    const [isShowing, setIsShowing] = useState(false);
    const [keyword, setKeyword] = useState("");

    const handleShowModal = (removeSoccerPlayer) => {
        setRemoveSoccerPlayer(removeSoccerPlayer);
        setIsShowing(true);
    }

    const handleShowOff = () => {
        setIsShowing(false);
    }


    const loadData = async (page = 1) => {
        const res = await findAll(page);
        const {data, first, prev, next, last, pages, items} = res;
        setPageInfo({first, prev, next, last, pages, items});
        setSoccerPlayer(data);
    };
    const handleRemoveSoccer = async () => {
        const result = await remove(removeSoccerPlayer.id);
        if (result) {
            toast.success("Removed successfully !");
        }else toast.error("Removed failed !");
        setIsShowing(false);
        loadData();
    }
    const handlePageClick = (page) => {
        loadData(page);
    };
    useEffect(() => {
        loadData();
    }, [])
    return (<>
        <Layout>
            <div className="container mt-4">
                <div className="d-flex gap-2 row">
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm theo mã, tên, vị trí..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className="col-6">
                        <div className={'mb-3 mt-3'}>
                            <Link to={'/soccerplayer/add'} className={'btn btn-success btn-sm'}>Thêm cầu thủ</Link>
                        </div>
                    </div>
                </div>
                <div className={'row mb-3'}>
                    <div className="col-12">
                        <Table border="1" cellPadding="10" cellSpacing="2">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mã cầu thủ</th>
                                <th>CLB</th>
                                <th>Tên</th>
                                <th>Ngày sinh</th>
                                <th>Giá trị chuyển nhượng (€)</th>
                                <th>Vị trí</th>
                                <th>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody>
                            {soccerPlayer.map(player => (
                                <tr key={player.code}>
                                    <td>{player.id}</td>
                                    <td>{player.code}</td>
                                    <td>{player.club?.name || "None"}</td>
                                    <td>{player.name}</td>
                                    <td>{player.birthDate}</td>
                                    <td>{player.transferValue.toLocaleString()}</td>
                                    <td>{player.position}</td>
                                    <td className={'d-flex align-items-center justify-content-between'}>
                                        <Button className={'btn-sm'} onClick={() => handleShowModal(player)}>Xóa cầu
                                            thủ</Button>
                                        <Link to={`/soccerplayer/detail/${player.id}`}
                                              className={'btn-sm btn btn-info'}>Xem chi
                                            tiết cầu thủ</Link>
                                        <Link to={`/soccerplayer/update/${player.id}`}
                                              className={'btn-sm btn btn-secondary'}>Chỉnh
                                            sửa cầu thủ</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className={'row mb-3'}>
                    <Pagination
                        total={pageInfo.items}
                        pageSize={5}
                        onChange={handlePageClick}
                    />
                </div>
            </div>
        </Layout>


        <DeleteModalComponent handleShowOff={handleShowOff}
                              removeSoccerPlayer={removeSoccerPlayer}
                              isShowing={isShowing}
                              handleRemove={handleRemoveSoccer}/>
    </>)
}