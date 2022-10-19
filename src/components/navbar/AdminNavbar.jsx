import * as React from "react";
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

function AdminNavbar() {
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
      <div className={"flex flex-wrap mx-auto"}>
        <div className="flex flex-wrap gap-2 mx-auto">
          <Tab
            onClick={() => navigate("/users")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/users" ? "bg-red-600" : ""
            }`}
          >
            <FiUsers />
            Пользователи
          </Tab>
          <Tab
            onClick={() => navigate("/avia-tickets")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/avia-tickets" ? "bg-red-600" : ""
            }`}
          >
            <GiAirplaneDeparture />
            Авиабилеты
          </Tab>
          <Tab
            onClick={() => navigate("/tour-package-order")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/tour-package-order" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiGrid />
            Турпакети
          </Tab>
          <Tab
            onClick={() => navigate("/finance")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/finance" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <GiCoins />
            Финансы
          </Tab>
          <Tab
            onClick={() => navigate("/partners")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/partners" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiGrid />
            Партнеры
          </Tab>
          <Tab
            onClick={() => navigate("/regions")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/regions" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiLock />
            Региони
          </Tab>
          <Tab
            onClick={() => navigate("/flights")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/flights" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiActivity />
            Рейсы
          </Tab>
          <Tab
            onClick={() => navigate("/transfersList")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/transfersList" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiAlertCircle />
            Трансфери
          </Tab>
          <Tab
            onClick={() => navigate("/visasList")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/visasList" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiAlertTriangle />
            Визи
          </Tab>
          <Tab
            onClick={() => navigate("/exTourList")}
            className={`cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm ${
              route.pathname === "/exTourList" ? "bg-red-600" : ""
            }`}
            selectedClassName="bg-red-600"
          >
            <FiAlertTriangle />
            Экскурсионные туры
          </Tab>
        </div>
        <div className={"flex flex-1 justify-end my-4"}>
          <div>
            <SignOut onClick={handlePressLogout}>
              <div className={"mx-2"}>
                <AiOutlineLogout />
              </div>
              Выйти
            </SignOut>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

AdminNavbar.propTypes = {
  window: PropTypes.func,
};

export default AdminNavbar;
