import React from "react";
import {Button, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import {logOut} from "../../redux/user/actions";
import AgentPage from "./AgentPage";

const AgentIndex = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePressLogout = () => {
        Cookies.remove("token")
        dispatch(logOut())
        navigate("/")
    }
    return (
        <div>
            <AgentPage />
            <Button onClick={handlePressLogout}>
                <Typography>
                    Log out
                </Typography>
            </Button>
        </div>
    )
}

export default AgentIndex