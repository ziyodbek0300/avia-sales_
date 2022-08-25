import React, {useEffect, useState} from 'react';
import regions from "../../api/projectApi/regions";
import moment from "moment";
import {GrTrash} from "react-icons/gr";
import {userRole} from "../../constants/userRole";
import RegionModal from "../../components/modal/RegionModal";

function Regions() {
    const [regions_list, setRegions] = useState([]);

    useEffect(() => {
        regions.getAllRegions().then(res => setRegions(res.data.result))
    }, []);

    const handleDelete = (id) => {
        const confirmation = window.confirm("Are you sure to delete this region?");
        if (confirmation) {
            regions.deleteOne(id)
                .then(() => regions_list.filter(a => a.id !== id))
                .catch(() => regions_list.filter(a => a.id !== id))
            regions.getAllRegions().then(res => {
                setRegions(res.data.result[0]);
            })
        }
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
                    <th className={"p-2 border border-red-200"}>Created At</th>
                    <th className={"p-2 border border-red-200"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {regions_list?.length === 0 ? <tr className={"border border-red-200"}>
                    <td colSpan={3} className={"border border-red-200 p-2 text-center"}>No Data</td>
                </tr> : regions_list?.map(a => {
                    return (<tr key={a.id} className={"border border-red-200"}>
                        <td className={"border border-red-200 p-2"}>{a.name}</td>
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
            setRegions={setRegions}
        />
    </div>);
}

export default Regions;
