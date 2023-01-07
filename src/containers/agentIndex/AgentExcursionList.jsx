import React, {useEffect, useState} from "react";
import moment from "moment";
// import {GrEdit, GrTrash} from "react-icons/gr";
import RegionModal from "../../components/modal/RegionModal";
import excursionTour from "../../api/projectApi/excursionTour";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function AgentExTourList() {
    const [regions_list, setRegions] = useState([]);
    const navigate = useNavigate();
    const userId = useSelector(state => state.user?.currentUser?.id);

    useEffect(() => {
        excursionTour.getAllForAgent(userId).then((res) => setRegions(res.data.result?.reverse()));
    }, [userId]);

    // const handleDelete = (id) => {
    //     const confirmation = window.confirm("Are you sure to delete this region?");
    //     if (confirmation) {
    //         excursionTour
    //             .deleteOne(id)
    //             .then(() => regions_list.filter((a) => a.id !== id))
    //             .catch(() => regions_list.filter((a) => a.id !== id));
    //         excursionTour.getAll().then((res) => {
    //             setRegions(res.data.result[0]);
    //         });
    //     }
    // };

    const [userModal, setUserModal] = useState({
        typeModal: "create",
        openModal: false,
        values: {},
    });

    const handleClose = () => {
        setUserModal({
            typeModal: "create",
            openModal: false,
            values: {},
        });
    };

    // const handlePressItemEdit = (type, item) => {
    //     setUserModal({
    //         typeModal: type,
    //         openModal: true,
    //         values: item,
    //     });
    // };

    return (
        <div className={"w-full"}>
            <div className="max-w-5xl m-auto p-5">
                <table className={"w-full border border-red-200"}>
                    <thead>
                    <tr className={"border border-red-200"}>
                        <th className={"p-2 border border-red-200"}>Имя</th>
                        <th className={"p-2 border border-red-200"}>Цена</th>
                        <th className={"p-2 border border-red-200"}>Номер</th>
                        <th className={"p-2 border border-red-200"}>Создано на</th>
                        {/*<th className={"p-2 border border-red-200"}>Действия</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {regions_list?.length === 0 ? (
                        <tr className={"border border-red-200"}>
                            <td
                                colSpan={3}
                                className={"border border-red-200 p-2 text-center"}
                            >
                                Нет данных
                            </td>
                        </tr>
                    ) : (
                        regions_list?.map((a) => {
                            return (
                                <tr
                                    onClick={() => navigate(`/details/exTourResult/${a.id}`)}
                                    key={a.id}
                                    className={
                                        "border border-red-200 cursor-pointer hover:bg-red-500/10 active:bg-red-500/20"
                                    }
                                >
                                    <td className={"border border-red-200 p-2"}>
                                        {a.contactName}
                                    </td>
                                    <td className={"border border-red-200 p-2"}>${a.total}</td>
                                    <td className={"border border-red-200 p-2"}>
                                        {a.phone_no}
                                    </td>
                                    <td className={"border border-red-200 p-2"}>
                                        {moment(a.createdAt).format("MMMM DD YYYY HH:mm")}
                                    </td>
                                    {/*<td className={"border border-red-200 p-2"}>*/}
                                    {/*    <button*/}
                                    {/*        className={*/}
                                    {/*            "p-2 border border-red-200 rounded hover:bg-gray-200 transition"*/}
                                    {/*        }*/}
                                    {/*        onClick={() => handleDelete(a.id)}*/}
                                    {/*    >*/}
                                    {/*        <GrTrash fontSize="1.5em" />*/}
                                    {/*    </button>*/}
                                    {/*    <button*/}
                                    {/*        className={*/}
                                    {/*            "p-2 border border-red-200 rounded hover:bg-gray-200 transition"*/}
                                    {/*        }*/}
                                    {/*        onClick={() => handlePressItemEdit("update", a)}*/}
                                    {/*    >*/}
                                    {/*        <GrEdit fontSize="1.5em" />*/}
                                    {/*    </button>*/}
                                    {/*</td>*/}
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
            <RegionModal
                type={userModal.typeModal}
                open={userModal.openModal}
                handleClose={handleClose}
                values={userModal.values}
                setRegions={setRegions}
            />
        </div>
    );
}

export default AgentExTourList;
