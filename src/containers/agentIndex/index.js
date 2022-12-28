import React from "react";
import AgentPage from "./AgentPage";
import TableSidebar from "../../components/navbar/TableSidebar";
import {AiOutlineLogout} from "react-icons/ai";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import {logOut} from "../../redux/user/actions";

const AgentIndex = () => {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    // const route = useLocation();
    const dispatch = useDispatch();
    const handlePressLogout = () => {
        if(window.confirm("Are you sure?")) {
            Cookies.remove("token");
            dispatch(logOut());
            navigate("/");
        }
    };

    return (
        <div>
            <AgentPage />
            <div className='flex border-t-2 border-red-400'>
                <TableSidebar />
                <div onClick={handlePressLogout} className={"fixed top-10 right-10 flex items-center gap-2 bg-red-100 p-2 rounded"}>
                    <AiOutlineLogout className={"text-red-500 text-4xl"}/>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default AgentIndex