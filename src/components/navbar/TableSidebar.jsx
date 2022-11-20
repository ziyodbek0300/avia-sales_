import * as React from "react";
import PropTypes from "prop-types";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {Tab} from "react-tabs";
import Users from '../../static/images/vuesax/outline/profile-2user.svg';
import Flight from '../../static/images/vuesax/bold/airplane.svg';
import People from '../../static/images/vuesax/outline/people.svg';
import Transfer from '../../static/images/vuesax/outline/car.svg';
import Task from '../../static/images/vuesax/outline/task.svg';
import Visa from '../../static/images/vuesax/outline/note.svg';
import Regions from '../../static/images/vuesax/bold/vuesax/outline/map.svg';
import Rays from '../../static/images/vuesax/outline/routing.svg';
import ExTour from '../../static/images/vuesax/outline/map.svg';
import {
    FiActivity,
} from "react-icons/fi";

function TableSidebar() {
    const navigate = useNavigate();
    const route = useLocation();

    return (
        <>
            <div className={"flex flex-col w-[16%] bg-gray-200 py-4 px-10"}>
                <Tab
                    onClick={() => navigate("/users")}
                    className={`sidebarTab ${route.pathname === "/users" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <img src={Users} alt={"profile"} width={"30"}/>
                    Пользователи
                </Tab>
                <Tab
                    onClick={() => navigate("/avia-tickets")}
                    className={`sidebarTab ${route.pathname === "/avia-tickets" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <img src={Flight} alt={"flight"} width={"30"}/>
                    Авиабилеты
                </Tab>
                <Tab
                    onClick={() => navigate("/hotel-orders")}
                    className={`sidebarTab ${route.pathname === "/hotel-orders" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <FiActivity className={"text-3xl text-white"}/>
                    Отели
                </Tab>
                <Tab
                    onClick={() => navigate("/tour-package-order")}
                    className={`sidebarTab ${route.pathname === "/tour-package-order" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={Task} alt={"people"} width={"30"}/>
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
                    <img src={People} alt={"people"} width={"30"}/>
                    Партнеры
                </Tab>
                <Tab
                    onClick={() => navigate("/regions")}
                    className={`sidebarTab ${route.pathname === "/regions" ? "bg-red-600 text-white" : " "
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={Regions} alt="region" width={"30"}/>
                    Региони
                </Tab>
                <Tab
                    onClick={() => navigate("/flights")}
                    className={`sidebarTab ${route.pathname === "/flights" ? "bg-red-600 text-white" : " "
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={Rays} alt="reysi" width={30}/>
                    Рейсы
                </Tab>
                <Tab
                    onClick={() => navigate("/transfersList")}
                    className={`sidebarTab ${route.pathname === "/transfersList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={Transfer} alt="cars" width={30}/>
                    Трансфери
                </Tab>
                <Tab
                    onClick={() => navigate("/visasList")}
                    className={`sidebarTab ${route.pathname === "/visasList" ? "bg-red-600 text-white " : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={Visa} alt="visa" width={30}/>
                    Визи
                </Tab>
                <Tab
                    onClick={() => navigate("/exTourList")}
                    className={`sidebarTab ${route.pathname === "/exTourList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={ExTour} alt="cars" width={30}/>
                    Экскурсионные туры
                </Tab>
            </div>
            <Outlet/>
        </>
    );
}

TableSidebar.propTypes = {
    window: PropTypes.func,
};

export default TableSidebar;