import React from "react";
import "rsuite/dist/rsuite.css";
import {Tab} from "react-tabs";
import {FiGrid} from "react-icons/fi";
import {GiAirplaneDeparture} from "react-icons/gi";
import {FaHotel} from "react-icons/fa";
import {GrVisa} from "react-icons/gr";
import {useTranslation} from "react-i18next";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";

function Home() {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (<div>
        <div className="pt-5">
            <div className="flex gap-2 max-w-5xl mx-auto m-0">
                <Tab
                    onClick={() => navigate('/')}
                    className={pathname === "/" ? "bg-red-600 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"
                        : "bg-red-400 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"}
                >
                    <FiGrid/>
                    {t('tourPack')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-flights')}
                    className={pathname === "/tab-flights" ? "bg-red-600 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"
                        : "bg-red-400 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"}
                >
                    <GiAirplaneDeparture/>
                    {t('aviaFlights')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-ex-tours')}
                    className={pathname === "/tab-ex-tours" ? "bg-red-600 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"
                        : "bg-red-400 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"}
                >
                    <FiGrid/>
                    {t('exTours')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-hotels')}
                    className={pathname === "/tab-hotels" ? "bg-red-600 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"
                        : "bg-red-400 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"}
                >
                    <FaHotel/>
                    {t('hotels')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-visas')}
                    className={pathname === "/tab-visas" ? "bg-red-600 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"
                        : "bg-red-400 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"}
                >
                    <GrVisa/>
                    {t('visa')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-transfers')}
                    className={pathname === "/tab-transfers" ? "bg-red-600 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"
                        : "bg-red-400 cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg text-white text-sm"}
                >
                    <GrVisa/>
                    {t('transfers')}
                </Tab>
            </div>
        </div>
        <Outlet/>
    </div>);
}

export default Home;
