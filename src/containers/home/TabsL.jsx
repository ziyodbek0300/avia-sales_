import React from 'react'
import { GrVisa } from "react-icons/gr";
import { FiGrid } from "react-icons/fi";
import { FaHotel } from "react-icons/fa";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TourPack from "./TabSections/TourPack";
import Hotels from "./TabSections/Hotels";
import Flights from "./TabSections/Flights";
import Visas from "./TabSections/Visas";
import Transfers from "./TabSections/Transfers";
import ExcursionTours from './TabSections/ExcursionTours';
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useQuery = () => new URLSearchParams(useLocation().search);


function TabsL() {
    const {t} = useTranslation()

    return (
        <div className="pt-5">
            <Tabs>
                <TabList className="flex gap-2 max-w-5xl mx-auto m-0">
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <FiGrid />
                        {t('tourPack')}
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <GiAirplaneDeparture />
                        {t('aviaFlights')}
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <FiGrid />
                        {t('exTours')}
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <FaHotel />
                        {t('hotels')}
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <GrVisa />
                        {t('visa')}
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <GrVisa />
                        {t('transfers')}
                    </Tab>
                </TabList>
                <TabPanel>
                    <TourPack />
                </TabPanel>
                <TabPanel>
                    <Flights />
                </TabPanel>
                <TabPanel className="header third">
                    <ExcursionTours />
                </TabPanel>
                <TabPanel>
                    <Hotels />
                </TabPanel>
                <TabPanel>
                    <Visas />
                </TabPanel>
                <TabPanel>
                    <Transfers />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default TabsL
