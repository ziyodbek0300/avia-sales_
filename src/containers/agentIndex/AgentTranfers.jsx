import React, {useEffect} from "react";
import {v4} from "uuid";
import moment from "moment/moment";
import {GrTrash} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {getAllTransfersForAgent} from "../../redux/transfers/actions";
import {useNavigate} from "react-router-dom";

function Transfers() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.transfers.transfers?.reverse());
    const navigate = useNavigate();
    const userId = useSelector(state => state.user?.currentUser?.id);

    useEffect(() => {
        dispatch(getAllTransfersForAgent(userId));
        console.log(selector)
    }, [dispatch]);

    return (
        <div className={"w-full"}>
            <div className="max-w-5xl m-auto p-5">
                <table className={"w-full border border-red-200"}>
                    <thead>
                    <tr className={"border border-red-200"}>
                        <th className={"p-2 border border-red-200"}>Имя</th>
                        <th className={"p-2 border border-red-200"}>Телефон</th>
                        <th className={"p-2 border border-red-200"}>Цена</th>
                        <th className={"p-2 border border-red-200"}>Время начала</th>
                        <th className={"p-2 border border-red-200"}>Создано на</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selector?.length === 0 ? (
                        <tr className={"border border-red-200"}>
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
                                        "hover:bg-red-400/10 active:bg-red-500/20 cursor-pointer"
                                    }
                                    onClick={() => navigate(`/transferDetails/result/${a.id}`)}
                                >
                                    <td className={"border border-red-200 p-2"}>{a?.name}</td>
                                    <td className={"border border-red-200 p-2"}>{a?.phone}</td>
                                    <td className={"border border-red-200 p-2"}>{a.price} $</td>
                                    <td className={"border border-red-200 p-2"}>
                                        {moment(a.time).format("hh:mm")}
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
                                    {/*        <GrTrash fontSize="1.5em"/>*/}
                                    {/*    </button>*/}
                                    {/*</td>*/}
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transfers;
