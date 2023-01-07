import * as React from "react";
import PropTypes from "prop-types";
import {useNavigate, useLocation} from "react-router-dom";
import {Tab} from "react-tabs";
import Flight from '../../static/images/vuesax/bold/airplane.svg';
import FlightDark from '../../static/images/vuesax/bold/airplane-dark.svg';
import Transfer from '../../static/images/vuesax/outline/car.svg';
import TransferDark from '../../static/images/vuesax/outline/car-dark.svg';
import Task from '../../static/images/vuesax/outline/task.svg';
import TaskDark from '../../static/images/vuesax/outline/task-dark.svg';
import Visa from '../../static/images/vuesax/outline/note.svg';
import VisaDark from '../../static/images/vuesax/outline/note-dark.svg';
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
                    onClick={() => navigate("/my")}
                    className={`sidebarTab ${route.pathname === "/my" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <img className={"icon-svg"} src={route.pathname === "/my" ? Flight : FlightDark} alt={"flight"}
                         width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Авиабилеты</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/my/agentHotels")}
                    className={`sidebarTab ${route.pathname === "/my/agentHotels" ? "bg-red-600 text-white" : ""
                    }`}
                >
                    <FiActivity className={"text-3xl text-dark hover:text-white"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Отели</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/my/agentTourPackOrders")}
                    className={`sidebarTab ${route.pathname === "/my/agentTourPackOrders" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/my/agentTourPackOrders" ? Task : TaskDark} alt={"people"}
                         width={"30"}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Турпакети</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/my/agentTransfersList")}
                    className={`sidebarTab ${route.pathname === "/my/agentTransfersList" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/my/agentTransfersList" ? Transfer : TransferDark} alt="cars"
                         width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Трансфери</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/my/agentVisas")}
                    className={`sidebarTab ${route.pathname === "/my/agentVisas" ? "bg-red-600 text-white " : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/my/agentVisas" ? Visa : VisaDark} alt="visa" width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Визи</p>
                </Tab>
                <Tab
                    onClick={() => navigate("/my/agentExTours")}
                    className={`sidebarTab ${route.pathname === "/my/agentExTours" ? "bg-red-600 text-white" : ""
                    }`}
                    selectedClassName="bg-red-600"
                >
                    <img src={route.pathname === "/my/agentExTours" ? ExTour : ExTourDark} alt="cars" width={30}/>
                    <p style={{
                        whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: "ellipsis"
                    }}>Экскурсионные туры</p>
                </Tab>
            </div>
        </>
    );
}

TableSidebar.propTypes = {
    window: PropTypes.func,
};

export default TableSidebar;