import React, {useEffect, useState} from "react"
import {Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {userRole} from "../../constants/userRole";
import AssignAdmin from "../autocomplete/AssignAdmin";
import user from "../../api/projectApi/user";
import {getAllUser} from "../../redux/user/actions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 0,
    p: 4,
    borderRadius: 8
};

const UserModal = ({open, handleClose, type, values}) => {
    // const dispac
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [data, setData] = useState({
        doc: '',
        city: '',
        nameCompany: '',
        fullName: '',
        phone: '',
        email: '',
        ...values,
        correctPassword: '',
        password: '',
    })

    useEffect(() => {
        if (open) {
            setData(values)
        }
    }, [values])
    const dispatch = useDispatch()

    const handlePressSubmit = () => {
        if (type === "create") {
            if (data.password === data.correctPassword) {
                const a = data
                delete a.correctPassword
                user.add(a)
                    .then(r => {
                        toast("Success", {type: "info"})
                        dispatch(getAllUser())
                        handleClose()
                    })
                    .catch(e => {
                        toast("Error", {type: "warning"})
                    })
            } else {
                toast("Error", {type: "warning"})
            }
        } else {
            user.updateUser(data.id, data)
                .then(r => {
                    toast("Success", {type: "info"})
                    dispatch(getAllUser())
                    handleClose()
                })
                .catch(e => {
                    toast("Error", {type: "warning"})
                })
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{...style, width: matches ? '50%' : "70%"}}>
                    <Typography fontSize={32}>
                        {type === "create" ? `Create ${userRole.admin === data.role ? "Admin" : "Agent"}` : `Update ${userRole.admin === data.role ? "Admin" : "Agent"}`}
                    </Typography>
                    <Box style={{marginTop: 8}}>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.city}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                placeholder={"city"}
                                onChange={(event) => setData({...data, city: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.nameCompany}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                placeholder={"company name"}
                                onChange={(event) => setData({...data, nameCompany: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.fullName}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                placeholder={"full name"}
                                onChange={(event) => setData({...data, fullName: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.phone}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                placeholder={"phone"}
                                onChange={(event) => setData({...data, phone: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <AssignAdmin value={data.adminId} setValue={(e) => setData({...data, adminId: e})}/>
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.email}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                placeholder={"email"}
                                onChange={(event) => setData({...data, email: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.password}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                type={"password"}
                                placeholder={"password"}
                                onChange={(event) => setData({...data, password: event.target.value})}
                            />
                        </Box>
                        <Box style={{marginTop: 4}}>
                            <TextField
                                value={data.correctPassword}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                type={"password"}
                                placeholder={"reenter password"}
                                onChange={(event) => setData({...data, correctPassword: event.target.value})}
                            />
                        </Box>
                    </Box>
                    <Button
                        onClick={handlePressSubmit}
                        style={{width: '100%', borderRadius: 10, height: 48, marginTop: 16}}
                        variant={"outlined"}
                    >
                        <Typography>
                            Save
                        </Typography>
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UserModal
