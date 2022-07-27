import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Outlet, useNavigate,
    useLocation
} from "react-router-dom"
import {Tab} from "react-tabs";
import {GiCoins, GiTicket} from "react-icons/gi";
import {GoDashboard} from "react-icons/go"
import {FiUsers, FiGrid} from "react-icons/fi"
import {AiOutlineLogout} from "react-icons/ai";
import {SignOut} from "../../containers/agentIndex/AgentPage/AgentPage";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import {logOut} from "../../redux/user/actions";

function AdminNavbar(props) {
    const navigate = useNavigate()
    const route = useLocation()
    const dispatch = useDispatch()
    const handlePressLogout = () => {
        Cookies.remove("token")
        dispatch(logOut())
        navigate("/")
    }
    return (
        <>
            <div className={"flex flex-wrap"}>
                <div className='flex flex-wrap gap-2 max-w-5xl mx-auto'>
                    <Tab
                        onClick={() => navigate("/dashboard")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/dashboard" ? "bg-red-600" : ""}`}
                    >
                        <GoDashboard/>
                        Dashboard
                    </Tab>
                    <Tab
                        onClick={() => navigate("/users")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/users" ? "bg-red-600" : ""}`}
                    >
                        <FiUsers/>
                        Users
                    </Tab>
                    <Tab
                        onClick={() => navigate("/avia-tickets")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/avia-tickets" ? "bg-red-600" : ""}`}
                    >
                        <GiTicket/>
                        Avia tickets
                    </Tab>
                    <Tab
                        className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm'
                        selectedClassName='bg-red-600'>
                        <FiGrid/>
                        Блок-места
                    </Tab>
                </div>
                <div className={"flex flex-1 justify-end my-4"}>
                    <div>
                        <SignOut onClick={handlePressLogout}>
                            <div className={"mx-2"}>
                                <AiOutlineLogout/>
                            </div>
                            Log out
                        </SignOut>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    );
}

AdminNavbar.propTypes = {
    window: PropTypes.func,
};

export default AdminNavbar;
