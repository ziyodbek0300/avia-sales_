import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Outlet,
    useNavigate,
    useLocation
} from "react-router-dom"
import {Tab} from "react-tabs";
import {GiAirplaneDeparture, GiCoins, GiTicket} from "react-icons/gi";
import {FiGrid, FiLock, FiUsers} from "react-icons/fi"
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
                        <GiAirplaneDeparture/>
                        Авиабилеты
                    </Tab>
                    <Tab
                        onClick={() => navigate("/tour-package")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/tour-package" ? "bg-red-600" : ""}`}
                        selectedClassName='bg-red-600'>
                        <FiGrid/>
                        Турпакеты
                    </Tab>
                    <Tab
                        onClick={() => navigate("/finance")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/finance" ? "bg-red-600" : ""}`}
                        selectedClassName='bg-red-600'>
                        <GiCoins/>
                        Финансы
                    </Tab>
                    <Tab
                        onClick={() => navigate("/partners")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/partners" ? "bg-red-600" : ""}`}
                        selectedClassName='bg-red-600'>
                        <FiGrid/>
                        Партнеры
                    </Tab>
                    <Tab
                        onClick={() => navigate("/regions")}
                        className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${route.pathname === "/regions" ? "bg-red-600" : ""}`}
                        selectedClassName='bg-red-600'>
                        <FiLock/>
                        Региони
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
