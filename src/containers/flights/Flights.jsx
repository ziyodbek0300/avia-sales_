import React, {useEffect, useState} from 'react';
import moment from "moment";
import {GrTrash} from "react-icons/gr";
import {userRole} from "../../constants/userRole";
import RegionModal from "../../components/modal/RegionModal";
import flights from "../../api/projectApi/flights";
import {useDispatch, useSelector} from "react-redux";
import {getAllFlights} from "../../redux/flights/actions";
import regions from "../../api/projectApi/regions";
import {v4} from "uuid";

function Flights() {
    const dispatch = useDispatch();
    const flights_list = useSelector(state => state.flights.flights);
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        let all = [];
        let arr = [];
        regions.getAllRegions().then(regions => {
            regions.data.result[0].forEach(reg => {
                flights_list.forEach(item => {
                    if (item.fromId === reg.id) {
                        arr.push({...item, fromName: reg.name});
                    }
                })
            })
            regions.data.result[0].forEach(reg => {
                arr.forEach(item => {
                    if (item.toId === reg.id) {
                        all.push({...item, toName: reg.name});
                    }
                })
            })
        });
        setFlights(all);
    }, [])

    console.log("flights", flights_list)
    useEffect(() => {
        dispatch(getAllFlights());
    }, []);

    const handleDelete = (id) => {
        // const confirmation = window.confirm("Are you sure to delete this region?");
        // if (confirmation) {
        //     flights.deleteOne(id)
        //         .then(() => flights_list.filter(a => a.id !== id))
        //         .catch((err) => console.log(err))
        //     flights.getAll().then(res => {
        //         setFlights(res.data.result[0]);
        //         console.log(res.data)
        //     })
        // }
    };

    const [userModal, setUserModal] = useState({
        typeModal: "create", openModal: false, values: {}
    })


    const handleClose = () => {
        setUserModal({
            typeModal: "create", openModal: false, values: {}
        })
    }

    const handlePressItemEdit = (type, item) => {
        console.log(item)
        setUserModal({
            typeModal: type, openModal: true, values: item
        })
    }

    return (<div>
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
                    <th className={"p-2 border border-red-200"}>Name</th>
                    <th className={"p-2 border border-red-200"}>Duration</th>
                    <th className={"p-2 border border-red-200"}>Start time</th>
                    <th className={"p-2 border border-red-200"}>End time</th>
                    <th className={"p-2 border border-red-200"}>Created At</th>
                    <th className={"p-2 border border-red-200"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {flights.length === 0 ? <tr className={"border border-red-200"}>
                    <td colSpan={3} className={"border border-red-200 p-2 text-center"}>No Data</td>
                </tr> : flights.map(a => {
                    return (<tr key={v4()} className={"border border-red-200"}>
                        <td className={"border border-red-200 p-2"}>{a?.fromName} - {a?.toName}</td>
                        <td className={"border border-red-200 p-2"}>{Math.floor(a.duration / 60) + ':' + a.duration % 60}</td>
                        <td className={"border border-red-200 p-2"}>{moment(a.startTime).format("HH:MM")}</td>
                        <td className={"border border-red-200 p-2"}>{moment(a.endTime).format("HH:MM")}</td>
                        <td className={"border border-red-200 p-2"}>{moment(a.createdAt).format("MMMM DD YYYY HH:MM")}</td>
                        <td className={"border border-red-200 p-2"}>
                            <button className={"p-2 border border-red-200 rounded hover:bg-gray-200 transition"}
                                    onClick={() => handleDelete(a.id)}><GrTrash fontSize="1.5em"/></button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
        <RegionModal
            type={userModal.typeModal}
            open={userModal.openModal}
            handleClose={handleClose}
            values={userModal.values}
            // setFlights={setFlights}
        />
    </div>);
}

export default Flights;
