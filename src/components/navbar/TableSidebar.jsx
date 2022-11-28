import * as React from "react";
import { NavLink } from 'react-router-dom';
import Logo from '../../static/images/logo.png'
import PropTypes from "prop-types";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tab } from "react-tabs";
import { GiAirplaneDeparture, GiCoins, GiTicket } from "react-icons/gi";
import {
    FiActivity,
    FiAlertCircle,
    FiAlertTriangle,
    FiGrid,
    FiLock,
    FiUsers,
} from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { SignOut } from "../../containers/agentIndex/AgentPage/AgentPage";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logOut } from "../../redux/user/actions";
import { useTranslation } from "react-i18next";


function TableSidebar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const route = useLocation();
    const dispatch = useDispatch();
    const handlePressLogout = () => {
        Cookies.remove("token");
        dispatch(logOut());
        navigate("/");
    };
    return (
        <>
            <div className={"flex flex-col w-[16%] bg-gray-200 py-4 px-10"}>
                <Tab
                    onClick={() => navigate("/users")}
                    className={`sidebarTab bg-red-600 text-white ${route.pathname === "/users" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <FiUsers className="text-2xl" />
                    Пользователи
                </Tab>
                <Tab
                    onClick={() => navigate("/avia-tickets")}
                    className={`sidebarTab ${route.pathname === "/avia-tickets" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <GiAirplaneDeparture className="text-2xl" />
                    Авиабилеты
                </Tab>
                <Tab
                    onClick={() => navigate("/tour-package-order")}
                    className={`sidebarTab ${route.pathname === "/tour-package-order" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiGrid className="text-2xl" />
                    Турпакети
                </Tab>
                {/*<Tab*/}
                {/*    onClick={() => navigate("/finance")}*/}
                {/*    className={`sidebarTab ${route.pathname === "/finance" ? "bg-red-600 text-white" : ""*/}
                {/*    }`}*/}
                {/*    selectedClassName="bg-red-600"*/}
                {/*>*/}
                {/*    <GiCoins className="text-2xl" />*/}
                {/*    Финансы*/}
                {/*</Tab>*/}
                <Tab
                    onClick={() => navigate("/partners")}
                    className={`sidebarTab ${route.pathname === "/partners" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiGrid className="text-2xl" />
                    Партнеры
                </Tab>
                <Tab
                    onClick={() => navigate("/regions")}
                    className={`sidebarTab ${route.pathname === "/regions" ? "bg-red-600 text-white" : " "
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiLock className="text-2xl" />
                    Региони
                </Tab>
                <Tab
                    onClick={() => navigate("/flights")}
                    className={`sidebarTab ${route.pathname === "/flights" ? "bg-red-600 text-white" : " "
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiActivity className="text-2xl" />
                    Рейсы
                </Tab>
                <Tab
                    onClick={() => navigate("/transfersList")}
                    className={`sidebarTab ${route.pathname === "/transfersList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiAlertCircle className="text-2xl" />
                    Трансфери
                </Tab>
                <Tab
                    onClick={() => navigate("/visasList")}
                    className={`sidebarTab ${route.pathname === "/visasList" ? "bg-red-600 text-white " : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiAlertTriangle className="text-2xl" />
                    Визи
                </Tab>
                <Tab
                    onClick={() => navigate("/exTourList")}
                    className={`sidebarTab ${route.pathname === "/exTourList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <FiAlertTriangle className="text-2xl" />
                    Экскурсионные туры
                </Tab>
            </div>
            <Outlet />
        </>
    );
}

TableSidebar.propTypes = {
    window: PropTypes.func,
};

export default TableSidebar;