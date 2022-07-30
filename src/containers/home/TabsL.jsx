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

function TabsL() {
    return (
        <div className="pt-5">
            <Tabs>
                <TabList className="flex gap-2 max-w-5xl mx-auto m-0">
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <FiGrid />
                        Турпакеты
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <GiAirplaneDeparture />
                        Авиабилеты
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <FiGrid />
                        Экскурсионные туры
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <FaHotel />
                        Отели
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <GrVisa />
                        Визы
                    </Tab>
                    <Tab
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                        selectedClassName="bg-red-600"
                    >
                        <GrVisa />
                        Трансферы
                    </Tab>
                </TabList>
                <TabPanel className="header">
                    <TourPack />
                </TabPanel>
                <TabPanel className="header">
                    <Flights />
                </TabPanel>
                <ExcursionTours className="header">
                    <TourPack />
                </ExcursionTours>
                <TabPanel className="header third">
                    <Hotels />
                </TabPanel>
                <TabPanel className="">
                    <Visas />
                </TabPanel>
                <TabPanel className="header fifth">
                    <Transfers />
                </TabPanel>
                <TabPanel className="header sixth">ok</TabPanel>
            </Tabs>
        </div>
    )
}

export default TabsL