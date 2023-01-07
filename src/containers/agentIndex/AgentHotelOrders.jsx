import React, {useEffect, useState} from "react";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import hotel from "../../api/projectApi/hotel";
import {useSelector} from "react-redux";

function AgentHotelOrders() {
    const [regions_list, setTourList] = useState([]);
    const navigate = useNavigate();
    const userId = useSelector(state => state.user?.currentUser?.id);

    useEffect(() => {
        hotel.getAllForAgent(userId).then((res) => {
            setTourList(res.data.result?.reverse());
        });
    }, [userId]);

    return (
        <div className={"w-full"}>
            <div className="max-w-5xl m-auto p-5">
                <table className={"w-full border border-red-200"}>
                    <thead>
                    <tr className={"border border-red-200"}>
                        <th className={"p-2 border border-red-200"}>Имя</th>
                        <th className={"p-2 border border-red-200"}>Создано на</th>
                        <th className={"p-2 border border-red-200"}>Мобильный телефон</th>
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
                                <tr key={a.id} onClick={() => navigate(`/details/hotelResult/${a.id}`)}
                                    className={"border border-red-200"}>
                                    <td className={"border border-red-200 p-2"}>{a.contactName}</td>
                                    <td className={"border border-red-200 p-2"}>
                                        {moment(a.createdAt).format("MMMM DD YYYY HH:mm")}
                                    </td>
                                    <td className={"border border-red-200 p-2"}>{a.phone}
                                    </td>
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

export default AgentHotelOrders;
