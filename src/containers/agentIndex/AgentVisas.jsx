import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import moment from "moment/moment";
// import { GrTrash } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {getAllVisasForAgent} from "../../redux/visas/actions";
import VisasModal from "../../components/modal/VisasModal";
import { useNavigate } from "react-router-dom";

function AgentVisas() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.visas.visas?.reverse());
    const navigate = useNavigate();
    const userId = useSelector(state => state.user?.currentUser?.id);

    useEffect(() => {
        dispatch(getAllVisasForAgent(userId));
    }, [dispatch, userId]);

    // const handleDelete = async (id) => {
    //     const confirmation = window.confirm("Are you sure to delete this visa?");
    //     if (confirmation) {
    //         await visas.deleteOne(id).then((data) => toast("Deleted", "success"));
    //         dispatch(getAllVisas());
    //     }
    // };

    const [flightModal, setFlightModal] = useState({
        typeModal: "create",
        openModal: false,
        values: {},
    });

    const handleClose = () => {
        setFlightModal({
            typeModal: "create",
            openModal: false,
            values: {},
        });
    };

    return (
        <div className={"w-full"}>
            <div className="max-w-5xl m-auto p-5">
                <table className={"w-full border border-red-200"}>
                    <thead>
                    <tr className={"border border-red-200"}>
                        <th className={"p-2 border border-red-200"}>Имя</th>
                        <th className={"p-2 border border-red-200"}>Телефон</th>
                        <th className={"p-2 border border-red-200"}>Тип визы</th>
                        <th className={"p-2 border border-red-200"}>Расположение</th>
                        <th className={"p-2 border border-red-200"}>Цена</th>
                        <th className={"p-2 border border-red-200"}>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selector?.length === 0 ? (
                        <tr className={"border hover:bg-red-500/10 border-red-200"}>
                            <td
                                colSpan={3}
                                className={"border border-red-200 p-2 text-center"}
                            >
                                Нет данных
                            </td>
                        </tr>
                    ) : (
                        selector?.map((a) => {
                            return (
                                <tr
                                    key={v4()}
                                    className={
                                        "hover:bg-red-500/10 active:bg-red-500/20 cursor-pointer"
                                    }
                                    onClick={() => navigate(`/details/visaResult/${a.id}`)}
                                >
                                    <td className={"border border-red-200 p-2"}>
                                        {a?.location}
                                    </td>
                                    <td className={"border border-red-200 p-2"}>{a?.phone}</td>
                                    <td className={"border border-red-200 p-2"}>
                                        {a?.visaType}
                                    </td>
                                    <td className={"border border-red-200 p-2"}>
                                        {a?.location}
                                    </td>
                                    <td className={"border border-red-200 p-2"}>{a.price} $</td>
                                    <td className={"border border-red-200 p-2"}>
                                        {moment(a.date).format("MMMM DD YYYY")}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
            <VisasModal
                type={flightModal.typeModal}
                open={flightModal.openModal}
                handleClose={handleClose}
                values={flightModal.values}
                // setFlights={setFlights}
            />
        </div>
    );
}

export default AgentVisas;
