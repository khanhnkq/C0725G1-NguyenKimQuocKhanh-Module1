export const DeleteModalComponent = ({handleShowOff, isShowing, removeSoccerPlayer, handleRemove}) => {
    return (
        <>
            <div
                className={`modal fade ${isShowing ? "show d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{backgroundColor: "rgba(0,0,0,0.5)"}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Xác nhận xóa</h5>
                            <button type="button" className="btn-close" onClick={handleShowOff}></button>
                        </div>

                        <div className="modal-body">
                            <p>
                                Bạn có chắc muốn xóa cầu thủ{" "}
                                <strong>{removeSoccerPlayer.name}</strong> không?
                            </p>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleShowOff}>
                                Hủy
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleRemove}
                            >
                                Xóa
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>)
}

