import React, {useEffect, useState} from "react";
import {FaUser} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/user/actions";
import {userRole} from "../../constants/userRole";

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

const LoginModal = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [open, setOpen] = useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const handleClose = () => {
        setOpen(false)
    }

    // const role
    const user = useSelector(state => state.user.currentUser)
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState({
        email: false,
        password: false,
    })
    useEffect(() => {
        if (!open) {
            setValues({
                email: '',
                password: ''
            })
        }
    }, [open])


    const handlePressSubmit = () => {
        // if (!values.email || typeof validateEmail(values.email) !== "object") {
        //     setError({...error, email: true})
        // } else if (!values.password || values.password.length < 8) {
        //     setError({...error, email: true})
        // } else {
        dispatch(loginUser(values.email, values.password, () => {
            setOpen(false)
        }))
        // }
    }
    return (
        <>
            {!user?.role ? (
                <li onClick={() => setOpen(true)} className='flex items-center border-r pr-3'>
                    <FaUser/>&nbsp;{t('enter')}
                </li>
            ) : (
                <li onClick={() => navigate(user?.role === userRole.admin ? "/users" : '/my')}
                    className='flex items-center border-r pr-3'>
                    <Box style={{display: 'flex'}}>
                        <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <FaUser style={{width: 24, height: "100%"}}/>&nbsp;
                        </Box>
                        <Box>
                            <Box style={{display: 'flex', flexDirection: 'row'}}>
                                {/*{t('enter')}*/}
                                <Typography fontSize={14}>
                                    {user?.fullName}
                                </Typography>
                            </Box>
                            <Box style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'center',
                                textAlign: 'center',
                                justifyContent: 'center'
                            }}>
                                <Typography fontSize={12}>
                                    {user.email}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </li>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{...style, width: matches ? '50%' : "70%"}}>
                    <Typography fontSize={32}>
                        Login
                    </Typography>
                    <Box style={{marginTop: 8}}>
                        <Box>
                            <TextField
                                value={values.email}
                                style={{width: "100%"}}
                                variant={"outlined"}
                                placeholder={"email"}
                                error={error.email}
                                onChange={(event) => setValues({...values, email: event.target.value})}
                                onFocus={() => setError({...error, email: false})}
                            />
                        </Box>
                        <Box style={{marginTop: 16}}>
                            <TextField
                                value={values.password}
                                type={"password"}
                                variant={"outlined"}
                                style={{width: "100%"}}
                                error={error.password}
                                placeholder={"password"}
                                onChange={(event) => setValues({...values, password: event.target.value})}
                            />
                        </Box>
                    </Box>
                    <Button
                        onClick={handlePressSubmit}
                        style={{width: '100%', borderRadius: 10, height: 48, marginTop: 16}}
                        variant={"outlined"}
                    >
                        <Typography>
                            Login
                        </Typography>
                    </Button>
                </Box>
            </Modal>

        </>
    )
}

export default LoginModal
