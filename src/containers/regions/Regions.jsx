import React, {useEffect, useState} from 'react';
import regions from "../../api/projectApi/regions";
import moment from "moment";
import {GrTrash} from "react-icons/gr";
import UserModal from "../../components/modal/UserModal";
import {userRole} from "../../constants/userRole";
import RegionModal from "../../components/modal/RegionModal";

function Regions(props) {
    const [regions_list, setRegions] = useState([]);

    useEffect(() => {
        regions.getAllRegions().then(res => setRegions(res.data.result[0]))
    }, []);

    const handleDelete = (id) => {
        regions.deleteOne(id)
            .then(res => regions_list.filter(a => a.id !== id))
            .catch(res => regions_list.filter(a => a.id !== id))
        regions.getAllRegions().then(res => {
            setRegions(res.data.result[0]);
            console.log(res.data.result[0])
        })
    }

    const [userModal, setUserModal] = useState({
        typeModal: "create",
        openModal: false,
        values: {}
    })


    const handleClose = () => {
        setUserModal({
            typeModal: "create",
            openModal: false,
            values: {}
        })
    }

    const handlePressItemEdit = (type, item) => {
        console.log(item)
        setUserModal({
            typeModal: type,
            openModal: true,
            values: item
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
            <table className={"w-full border"}>
                <thead>
                <tr className={"border"}>
                    <th className={"p-2 border"}>Name</th>
                    <th className={"p-2 border"}>Created At</th>
                    <th className={"p-2 border"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {regions_list.map(a => <tr key={a.id} className={"border"}>
                    <td className={"border p-2"}>{a.name}</td>
                    <td className={"border p-2"}>{moment(a.createdAt).format("MMMM DD YYYY HH:MM")}</td>
                    <td className={"border p-2"}>
                        <button className={"p-2 border rounded hover:bg-gray-200 transition"}
                                onClick={() => handleDelete(a.id)}><GrTrash fontSize="1.5em"/></button>
                    </td>
                </tr>)}
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
        {/*<input type="text" placeholder={"Region Name"}/>*/}
        {/*<input type="text" placeholder={"Region Name"}/>*/}
        {/*<input type="text" placeholder={"Region Name"}/>*/}
        {/*<input type="text" placeholder={"Region Name"}/>*/}
        {/*<input type="text" placeholder={"Region Name"}/>*/}
    </div>);
}

export default Regions;
