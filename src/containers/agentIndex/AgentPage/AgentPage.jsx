import React from 'react'
import { Button } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MuiTable from '../../../components/table';
import { FiGrid } from 'react-icons/fi';
import { GiAirplaneDeparture } from 'react-icons/gi';

function AgentPage() {

    const data = [
        {
            date: new Date(),
            grounds: 'Оплата заказа #57274',
            total: 1100
        },
        {
            date: new Date(),
            grounds: 'Оплата заказа #57274',
            total: 1100
        },
        {
            date: new Date(),
            grounds: 'Оплата заказа #57274',
            total: 1100
        },
        {
            date: new Date(),
            grounds: 'Оплата заказа #57274',
            total: 1100
        },
        {
            date: new Date(),
            grounds: 'Оплата заказа #57274',
            total: 1100
        },
        {
            date: new Date(),
            grounds: 'Оплата заказа #57274',
            total: 1100
        }
    ]

    const data2 = []

    const headCells = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
            isTime: true
        },
        {
            id: 'grounds',
            numeric: true,
            disablePadding: false,
            label: 'Grounds',
            isTime: false
        },
        {
            id: 'total',
            numeric: true,
            disablePadding: false,
            label: 'Total',
            isTime: false
        }
    ];

    const headCells2 = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
            isTime: true
        },
        {
            id: 'flight',
            numeric: true,
            disablePadding: false,
            label: 'Flight',
            isTime: false
        },
        {
            id: 'blocks',
            numeric: true,
            disablePadding: false,
            label: 'Blocks',
            isTime: false
        },
        {
            id: 'armor',
            numeric: true,
            disablePadding: false,
            label: 'Armor',
            isTime: false
        },
        {
            id: 'left',
            numeric: true,
            disablePadding: false,
            label: 'Left',
            isTime: false
        }
    ];

    return (
        <div className='lg:max-w-5xl mx-auto lg:px-0 px-8'>
            <Tabs>
                <TabList className='flex gap-2 max-w-5xl mx-auto'>
                    <Tab className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm' selectedClassName='bg-red-600'>
                        <GiAirplaneDeparture />
                        Авиабилеты
                    </Tab>
                    <Tab className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm' selectedClassName='bg-red-600'>
                        <FiGrid />
                        Турпакеты
                    </Tab>
                </TabList>

                <TabPanel>
                    <MuiTable
                        rows={data.map(r => {
                            return {
                                ...r,
                            }
                        })}
                        headCells={headCells}
                    />
                </TabPanel>
                <TabPanel>
                    <MuiTable
                        rows={data2.map(r => {
                            if(data2.length !== 0) {
                                return {
                                    ...r,
                                }
                            } else {
                                return (
                                    <p>No Data</p>
                                )
                            }
                        })}
                        headCells={headCells2}
                    />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default AgentPage