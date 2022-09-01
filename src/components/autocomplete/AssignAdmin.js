import React, {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import user from "../../api/projectApi/user";
import {toast} from "react-toastify";

const AssignAdmin = ({value, setValue = () => ({})}) => {
    const [a, setA] = useState()
    const [admins, setAdmins] = useState([])
    useEffect(() => {
        user.getAll()
            .then(r => {
                const data = r.data.result.admin
                let newData = []
                data.map((e) => {
                    newData = [...newData, {id: e.id, label: e.fullName||""}]
                    if (e.id === value) {
                        setA({id: e.id, label: e.fullName||""})
                    }
                })
                // console.log(newData)
                setAdmins(newData)
            })
            .catch(() => {
                toast("Network error")
            })
        return () => setA([])
    }, [])
    const handleChange = (e, r) => {
        setA(r)
    }

    // useEffect(() => {
    //     setValue(a?.id)
    // }, [a?.id])

    return (
        <Autocomplete
            // value={a}
            disablePortal
            style={{width: "100%"}}
            id="combo-box-demo"
            options={admins}
            sx={{width: 300}}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant={"outlined"}
                    placeholder={"assign admin"}
                />
            )}
            onChange={handleChange}
        />
    )
}

export default AssignAdmin

AssignAdmin.defaultValue = {
    setValue: () => {
    }
}
