import React from 'react';
import {Tab} from "react-tabs";
import {FiGrid} from "react-icons/fi";
import {GiAirplaneDeparture} from "react-icons/gi";
import {FaHotel} from "react-icons/fa";
import {GrVisa} from "react-icons/gr";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function NavS() {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (
        <div className="pt-5">
            <div className="flex max-w-5xl mx-auto items-center m-0">
                <Tab
                    onClick={() => navigate('/')}
                    className={pathname === "/" ? "cursor-pointer outline-none flex font-bold items-center text-white text-sm pr-10"
                        : "cursor-pointer outline-none items-center flex text-white/70 text-sm pr-10"}
                >
                    {t('tourPack')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-flights')}
                    className={pathname === "/tab-flights" ? "cursor-pointer flex outline-none font-bold items-center text-white text-sm pr-10"
                        : "cursor-pointer outline-none items-center flex text-white/70 text-sm pr-10"}
                >
                    {t('aviaFlights')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-ex-tours')}
                    className={pathname === "/tab-ex-tours" ? "cursor-pointer flex outline-none font-bold items-center text-white text-sm pr-10"
                        : "cursor-pointer outline-none items-center flex text-white/70 text-sm pr-10"}
                >
                    {t('exTours')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-hotels')}
                    className={pathname === "/tab-hotels" ? "cursor-pointer flex outline-none font-bold items-center text-white text-sm pr-10"
                        : "cursor-pointer outline-none items-center flex text-white/70 text-sm pr-10"}
                >
                    {t('hotels')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-visas')}
                    className={pathname === "/tab-visas" ? "cursor-pointer flex outline-none font-bold items-center text-white text-sm pr-10"
                        : "cursor-pointer outline-none flex items-center text-white/70 text-sm pr-10"}
                >
                    {t('visa')}
                </Tab>
                <Tab
                    onClick={() => navigate('/tab-transfers')}
                    className={pathname === "/tab-transfers" ? "cursor-pointer flex outline-none font-bold items-center text-white text-sm pr-10"
                        : "cursor-pointer outline-none flex items-center text-white/70 text-sm pr-10"}
                >
                    {t('transfers')}
                </Tab>
            </div>
        </div>
    );
}

export default NavS;