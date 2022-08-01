import React from 'react'
import {Button} from "@mui/material";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MuiTable from '../../../components/table';
import {FiGrid} from 'react-icons/fi';
import {GiAirplaneDeparture, GiCoins} from 'react-icons/gi';
import styled from "@emotion/styled";
import Theme from "../../../constants/theme";
import {AiOutlineLogout} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {logOut} from "../../../redux/user/actions";

export const SignOut = styled(Button)`
  color:red;
  border: 1px solid ${Theme.primaryColor};
  padding: 4px 16px;
  text-transform: unset;
  border-radius:.5rem
`

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

    const data3 = [
        {
            order: new Date(),
            order_num: "742",
            status: 'Забронирован',
            payment: 'Оплачен',
            direction: 'TAS-SSH-TAS',
            date1: new Date(),
            date2: new Date(),
            price: 1599,
            tourists: 'AVAZKHON / AVAZKHON UMID / UMID'
        },
        {
            order: new Date(),
            order_num: "742",
            status: 'Забронирован',
            payment: 'Оплачен',
            direction: 'TAS-SSH-TAS',
            date1: new Date(),
            date2: new Date(),
            price: 1599,
            tourists: 'AVAZKHON / AVAZKHON UMID / UMID'
        },
        {
            order: new Date(),
            order_num: "742",
            status: 'Забронирован',
            payment: 'Оплачен',
            direction: 'TAS-SSH-TAS',
            date1: new Date(),
            date2: new Date(),
            price: 1599,
            tourists: 'AVAZKHON / AVAZKHON UMID / UMID'
        },
        {
            order: new Date(),
            order_num: "742",
            status: 'Забронирован',
            payment: 'Оплачен',
            direction: 'TAS-SSH-TAS',
            date1: new Date(),
            date2: new Date(),
            price: 1599,
            tourists: 'AVAZKHON / AVAZKHON UMID / UMID'
        }
    ]

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

    const headCells3 = [
        {
            id: 'order',
            numeric: true,
            disablePadding: false,
            label: 'Order',
            isTime: true
        },
        {
            id: 'status',
            numeric: true,
            disablePadding: false,
            label: 'Status',
            isTime: false
        },
        {
            id: 'payment',
            numeric: true,
            disablePadding: false,
            label: 'Payment',
            isTime: false
        },
        {
            id: 'direction',
            numeric: true,
            disablePadding: false,
            label: 'Direction',
            isTime: false
        },
        {
            id: 'date1',
            numeric: true,
            disablePadding: false,
            label: 'Date 1',
            isTime: true
        },
        {
            id: 'date2',
            numeric: true,
            disablePadding: false,
            label: 'Date 2',
            isTime: true
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
            isTime: false
        },
        {
            id: 'tourists',
            numeric: true,
            disablePadding: false,
            label: 'Tourists',
            isTime: false
        },
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePressLogout = () => {
        Cookies.remove("token")
        dispatch(logOut())
        navigate("/")
    }

    return (
        <div className='lg:max-w-5xl mx-auto lg:px-0 px-8'>
            <Tabs>
                <TabList className='flex flex-wrap'>
                   <div className='flex flex-wrap gap-2 max-w-5xl mx-auto'>
                       <Tab
                           className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm'
                           selectedClassName='bg-red-600'>
                           <GiAirplaneDeparture/>
                           Авиабилеты
                       </Tab>
                       <Tab
                           className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm'
                           selectedClassName='bg-red-600'>
                           <FiGrid/>
                           Турпакеты
                       </Tab>
                       <Tab
                           className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm'
                           selectedClassName='bg-red-600'>
                           <GiCoins/>
                           Финансы
                       </Tab>
                       {/*<Tab*/}
                       {/*    className='cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg my-4 bg-red-400 text-white text-sm'*/}
                       {/*    selectedClassName='bg-red-600'>*/}
                       {/*    <FiCast/>*/}
                       {/*    Партнер*/}
                       {/*</Tab>*/}
                   </div>
                    <div className={"flex flex-1 justify-end my-4"}>
                        <div>
                            <SignOut onClick={handlePressLogout}>
                                <div className={"mx-2"}>
                                    <AiOutlineLogout/>
                                </div>
                                Log out
                            </SignOut>
                        </div>
                    </div>
                </TabList>

                    <TabPanel className={"min-h-full"}>
                        <MuiTable
                            tableName={"Balance: 1000$"}
                            rows={data.map(r => {
                                return {
                                    ...r,
                                    total: r.total + "$"
                                }
                            })}
                            headCells={headCells}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MuiTable
                            title={""}
                            rows={data3.map(r => {
                                return {
                                    ...r,
                                }
                            })}
                            headCells={headCells3}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MuiTable
                            tableName={"Balance: 1000$"}
                            rows={data.map(r => {
                                return {
                                    ...r,
                                    total: r.total + "$"
                                }
                            })}
                            headCells={headCells}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MuiTable
                            tableName={"Balance: 1000$"}
                            rows={data2.map(r => {
                                return {
                                    ...r,
                                    total: r.total + "$"
                                }
                            })}
                            headCells={headCells2}
                        />
                    </TabPanel>
                    {/*<TabPanel>*/}
                    {/*    <MuiTable*/}
                    {/*        tableName={"Balance: 1000$"}*/}
                    {/*        rows={data2.map(r => {*/}
                    {/*            return {*/}
                    {/*                ...r,*/}
                    {/*                total: r.total + "$"*/}
                    {/*            }*/}
                    {/*        })}*/}
                    {/*        headCells={headCells2}*/}
                    {/*    />*/}
                    {/*</TabPanel>*/}
            </Tabs>
        </div>
    )
}

export default AgentPage