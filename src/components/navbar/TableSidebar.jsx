import * as React from "react";
import PropTypes from "prop-types";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {Tab} from "react-tabs";
import Users from '../../static/images/vuesax/outline/profile-2user.svg';
import UsersDark from '../../static/images/vuesax/outline/profile-2user-dark.svg';
import Flight from '../../static/images/vuesax/bold/airplane.svg';
import FlightDark from '../../static/images/vuesax/bold/airplane-dark.svg';
import People from '../../static/images/vuesax/outline/people.svg';
import PeopleDark from '../../static/images/vuesax/outline/people-dark.svg';
import Transfer from '../../static/images/vuesax/outline/car.svg';
import TransferDark from '../../static/images/vuesax/outline/car-dark.svg';
import Task from '../../static/images/vuesax/outline/task.svg';
import TaskDark from '../../static/images/vuesax/outline/task-dark.svg';
import Visa from '../../static/images/vuesax/outline/note.svg';
import VisaDark from '../../static/images/vuesax/outline/note-dark.svg';
import Regions from '../../static/images/vuesax/bold/vuesax/outline/map.svg';
import RegionsDark from '../../static/images/vuesax/bold/vuesax/outline/map-dark.svg';
import Rays from '../../static/images/vuesax/outline/routing.svg';
import RaysDark from '../../static/images/vuesax/outline/routing-dark.svg';
import ExTour from '../../static/images/vuesax/outline/map.svg';
import ExTourDark from '../../static/images/vuesax/outline/map-dark.svg';
import {
    FiActivity,
} from "react-icons/fi";

function TableSidebar() {
    const navigate = useNavigate();
    const route = useLocation();

    return (
        <>
            <div className={"flex flex-col w-[16%] h-screen bg-gray-100 py-4 px-5"}>
                <Tab
                    onClick={() => navigate("/users")}
                    className={`sidebarTab ${route.pathname === "/users" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <img className={"icon-svg"} src={route.pathname === "/users" ? Users : UsersDark} alt={"profile"} width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Пользователи</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/avia-tickets")}
                    className={`sidebarTab ${route.pathname === "/avia-tickets" ? "bg-red-600 text-white" : ""
                    }`}
                >
                        <img className={"icon-svg"} src={route.pathname === "/avia-tickets" ? Flight : FlightDark} alt={"flight"} width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Авиабилеты</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/hotel-orders")}
                    className={`sidebarTab ${route.pathname === "/hotel-orders" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <FiActivity className={"text-3xl text-dark hover:text-white"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Отели</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/tour-package-order")}
                    className={`sidebarTab ${route.pathname === "/tour-package-order" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/tour-package-order" ? Task : TaskDark} alt={"people"} width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Турпакети</p>
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
                    <img src={route.pathname === "/partners" ? People : PeopleDark} alt={"people"} width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Партнеры</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/regions")}
                    className={`sidebarTab ${route.pathname === "/regions" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/regions" ? Regions : RegionsDark} alt="region" width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Региони</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/flights")}
                    className={`sidebarTab ${route.pathname === "/flights" ? "bg-red-600 text-white" : " "
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/flights" ? Rays : RaysDark} alt="reysi" width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Рейсы</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/transfersList")}
                    className={`sidebarTab ${route.pathname === "/transfersList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/transfersList" ? Transfer : TransferDark} alt="cars" width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Трансфери</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/visasList")}
                    className={`sidebarTab ${route.pathname === "/visasList" ? "bg-red-600 text-white " : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/visasList" ? Visa : VisaDark} alt="visa" width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Визи</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/exTourList")}
                    className={`sidebarTab ${route.pathname === "/exTourList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/exTourList" ? ExTour : ExTourDark} alt="cars" width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Экскурсионные туры</p>
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