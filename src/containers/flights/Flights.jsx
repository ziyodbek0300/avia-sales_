import React, {useEffect, useState} from 'react';
import moment from "moment";
import {GrTrash} from "react-icons/gr";
import {userRole} from "../../constants/userRole";
import {useDispatch, useSelector} from "react-redux";
import {getAllFlights} from "../../redux/flights/actions";
import {v4} from "uuid";
import FlightsModal from "../../components/modal/FlightsModal";
import flights from "../../api/projectApi/flights";

function Flights() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.flights.flights);
    useEffect(() => {
        dispatch(getAllFlights())
    }, [])

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure to delete this region?");
        if (confirmation) {
            await flights.deleteOne(id)
            dispatch(getAllFlights())
        }
    };

    const [flightModal, setFlightModal] = useState({
        typeModal: "create", openModal: false, values: {}
    })


    const handleClose = () => {
        setFlightModal({
            typeModal: "create", openModal: false, values: {}
        })
    }

    const handlePressItemEdit = (type, item) => {
        setFlightModal({
            typeModal: type, openModal: true, values: item
        })
    }

    return (<div className={"w-full"}>
        <div className="max-w-5xl m-auto p-5">
            <div className={"text-right py-3"}>
                <button className={"p-2 border border-gray-400 text-white rounded bg-green-500 transition"}
                        onClick={() => handlePressItemEdit("create", {role: userRole.admin})}>Добавит
                    регион
                </button>
            </div>
            <table className={"w-full border border-red-200"}>
                <thead>
                <tr className={"border border-red-200"}>
                    <th className={"p-2 border border-red-200"}>Имя</th>
                    <th className={"p-2 border border-red-200"}>Цена</th>
                    <th className={"p-2 border border-red-200"}>Продолжительность</th>
                    <th className={"p-2 border border-red-200"}>Время начала</th>
                    <th className={"p-2 border border-red-200"}>Время окончания</th>
                    <th className={"p-2 border border-red-200"}>Создано на</th>
                    <th className={"p-2 border border-red-200"}>Действия</th>
                </tr>
                </thead>
                <tbody>
                {selector?.length === 0 ? <tr className={"border border-red-200"}>
                    <td colSpan={3} className={"border border-red-200 p-2 text-center"}>No Data</td>
                </tr> : selector?.map(a => {
                    return (<tr key={v4()}>
                        <td className={"border border-red-200 p-2"}>{a?.fromName} - {a?.toName}</td>
                        <td className={"border border-red-200 p-2"}>{a.price} $</td>
                        <td className={"border border-red-200 p-2"}>{Math.floor(a.duration / 60) + ':' + a.duration % 60}</td>
                        <td className={"border border-red-200 p-2"}>{moment(a.startTime).format("HH:mm")}</td>
                        <td className={"border border-red-200 p-2"}>{moment(a.endTime).format("HH:mm")}</td>
                        <td className={"border border-red-200 p-2"}>
                            <button className={"p-2 border border-red-200 rounded hover:bg-gray-200 transition"}
                                    onClick={() => handleDelete(a.id)}><GrTrash fontSize="1.5em"/></button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
        <FlightsModal
            type={flightModal.typeModal}
            open={flightModal.openModal}
            handleClose={handleClose}
            values={flightModal.values}
        />
    </div>);
}

export default Flights;
