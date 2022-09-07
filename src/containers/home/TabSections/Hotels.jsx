import React, {useRef, useState} from 'react'
import {BsArrowRightShort} from 'react-icons/bs';
import {RiSendPlane2Line} from 'react-icons/ri';
import hotel from '../../../api/projectApi/hotel';
import hotelsTownLists from '../../../constants/hotelsTownLists';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BiStar} from "react-icons/bi";

const RenderItem = ({e}) => {
    // console.log()
    const hotelId = e?.inc
    const [values, setValues] = useState({
        loading: false,
        data: [],
        open: false,
        tabIndex: 0
    })
    const handlePress = async () => {
        setValues({
            ...values,
            data: [],
            loading: true,
            open: !values.open
        })
        if (!values.open) {
            const data = await hotel.getPrice(hotelId).catch(e => {
                setValues({
                    ...values,
                    loading: false,
                    open: true,
                })
            })
            if (data.status === 200) {
                setValues({
                    ...values,
                    open: true,
                    loading: false,
                    data: data.data,
                })
            } else {
                toast("Get error", {type: 'warning'})
            }
        }
    }
    const navigate = useNavigate()
    return (
        <div className={'bg-white p-2 gap-5 shadow border rounded-lg'}>
            <div onClick={handlePress} className="cursor-pointer flex gap-2"
                 key={`${hotelId}`}>
                <img className="rounded" width="200" style={{maxHeight: '200px'}}
                     src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${hotelId}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                     alt=""/>
                <div>
                    <h1 className="text-xl font-bold block">{e.name}</h1>
                    {new Array(e.starCount).fill("a").map(a => {return (<span className={"mx-3"}><BiStar color={"black"}/>{a}</span>)})}
                    <p>start count {e.starCount}</p>
                </div>
                {hotelsTownLists.map(a => {
                    return a.id === e.town && (
                        <p className="text-sm block bg-red-500">{a.title}</p>
                    )
                })}
            </div>

            {values.open ? (
                <>
                    <div className={"flex justify-between py-4"}>
                        <div onClick={() => setValues({...values, tabIndex: 1})}
                             className={values.tabIndex === 1 ? "active:opacity-80 cursor-pointer flex justify-center bg-orange-500 w-full text-center rounded-lg p-2 text-white capitalize text-lg font-bold" : "flex cursor-pointer justify-center bg-gray-200 w-full text-center rounded-lg p-2 capitalize text-lg font-bold"}>
                            photos
                        </div>
                        <div onClick={() => setValues({...values, tabIndex: 0})}
                             className={values.tabIndex === 0 ? "active:opacity-80 cursor-pointer flex justify-center bg-orange-500 w-full text-center rounded-lg p-2 text-white capitalize text-lg font-bold" : "flex cursor-pointer justify-center bg-gray-200 w-full text-center rounded-lg p-2 capitalize text-lg font-bold"}>
                            rooms
                        </div>
                    </div>
                    <div className={"bg-gray-200 rounded p-5"}>
                        {values.tabIndex === 0 ? (
                            <div className={"mt-16"}>
                                <form action="">
                                    <div>
                                        {
                                            values.loading ? (
                                                <div>
                                                    <div className="lds-dual-ring"></div>
                                                </div>
                                            ) : (
                                                <div className={'flex flex-col gap-5'}>
                                                    {
                                                        values.data.map(e => {
                                                            return e.status !== "D" && (
                                                                <div style={{width: "100%", minHeight: 200}}
                                                                     className={"bg-orange-500"}>
                                                                    <input name={"asd"} type="radio"/>
                                                                    name {e.name}
                                                                    <br/>
                                                                    price {e.price}
                                                                    <br/>
                                                                    data {e.dataa.name}
                                                                    <br/>
                                                                    <button className={"p-4 bg-blue-500"}
                                                                            onClick={() => navigate(`hotel/order/${hotelId}/${e.inc}?name=${e.name}&adult=${1}&c=${2}&d=${3}`)}>
                                                                        order
                                                                    </button>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </form>

                            </div>
                        ) : (
                            <div className={"flex gap-4"}>
                                <img className="rounded hover:shadow-md transition hover:shadow-orange-300"
                                     width="150px" style={{maxHeight: '150px', objectFit: 'cover'}}
                                     src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                     alt=""/>
                                <img className="rounded hover:shadow-md transition hover:shadow-orange-300"
                                     width="150px" style={{maxHeight: '150px', objectFit: 'cover'}}
                                     src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=1&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                     alt=""/>
                                <img className="rounded hover:shadow-md transition hover:shadow-orange-300"
                                     width="150px" style={{maxHeight: '150px', objectFit: 'cover'}}
                                     src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=2&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                     alt=""/>
                            </div>
                        )}
                    </div>
                </>
            ) : null}
        </div>

    )
}

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [values, setValues] = useState({
        town: hotelsTownLists[0].id,
        datebeg: null,
        dateend: null
    })
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handlePressFind = () => {
        hotel.getHotels(values.town)
            .then(r => {
                setHotels(r.data)
            })
            .catch(e => {
                setHotels([])
            })
    }

    const townRef = useRef();

    return (
        <>
            <div className={'header fourth'}>
                <div className="max-w-5xl mx-auto py-44">
                    <div
                        className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                        <div className="flex gap-2 items-center py-4 text-gray-600">
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    Направление
                                </label>
                                <select
                                    ref={townRef}
                                    className="p-2 rounded border-4 border-red-600 w-full"
                                    // type="text"
                                    name="from"
                                    placeholder="- выбрать -"
                                    id="from"
                                    onChange={e => {
                                        setValues({...values, town: e.target.value})
                                    }}
                                >
                                    {hotelsTownLists.map(e => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <RiSendPlane2Line className="text-white w-10"/>
                            <div className="w-full">
                                <label htmlFor="date" className="block text-white text-sm">
                                    Дата заезда
                                </label>
                                <input
                                    type="date"
                                    className="p-2 rounded border-4 border-red-600 w-full"
                                    name="date"
                                    id="date"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="date" className="block text-white text-sm">
                                    Дата выезда
                                </label>
                                <input
                                    type="date"
                                    className="p-2 rounded border-4 border-red-600 w-full"
                                    name="date"
                                    id="date"
                                />
                            </div>
                            <div className="w-full relative">
                                <label htmlFor="date" className="block text-white text-sm">
                                    Гости и номера
                                </label>
                                <input
                                    autoComplete={"off"}
                                    value={"В:" + adults + " М:" + infant + " Д:" + children + ", Эконом"}
                                    onClick={() => setIsOpen(!isOpen)}
                                    onChange={() => console.log('as')}
                                    className="p-2 rounded border-4 border-red-600 w-full"
                                    type="text"
                                    name="from"
                                    placeholder="2, Эконом"
                                    id="from"
                                />
                                {isOpen ? (<div className="absolute top-full -left-20">
                                    <div className="bg-white rounded-lg p-1 tooltip-in relative mt-5 w-80 shadow">
                                        <div className="flex p-3">
                                            <div className="w-full">
                                                <p>Взрослые <br/>
                                                    Старше 12 лет</p>
                                            </div>
                                            <div className="flex w-full">
                                                <button onClick={() => setAdults(prev => prev -= 1)}
                                                        className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-
                                                </button>
                                                <input type="number" value={adults}
                                                       onInput={(e) => setAdults(+e.target.value)}
                                                       className="border-0 text-center p-2 w-1/2 outline-none bg-transparent"/>
                                                <button onClick={() => setAdults(prev => prev += 1)}
                                                        className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex p-3">
                                            <div className="w-full">
                                                <p>Дети <br/>
                                                    От 2 до 12 лет</p>
                                            </div>
                                            <div className="flex w-full">
                                                <button onClick={() => setChildren(prev => prev -= 1)}
                                                        className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-
                                                </button>
                                                <input type="number" value={children}
                                                       onInput={(e) => setChildren(prev => +e.target.value)}
                                                       className="text-center border-0 p-2 w-1/2 outline-none bg-transparent"/>
                                                <button onClick={() => setChildren(prev => prev += 1)}
                                                        className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex p-3">
                                            <div className="w-full">
                                                <p>Младенцы <br/>
                                                    До 2 лет </p>
                                            </div>
                                            <div className="flex w-full">
                                                <button onClick={() => setInfant(prev => prev -= 1)}
                                                        className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-
                                                </button>
                                                <input type="number" value={infant}
                                                       onInput={(e) => setInfant(prev => +e.target.value)}
                                                       className="text-center border-0 p-2 w-1/2 outline-none bg-transparent"/>
                                                <button onClick={() => setInfant(prev => prev += 1)}
                                                        className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>) : ""}
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handlePressFind}
                                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                                Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                {hotels.map(e => {
                    if (!(e.status !== 'D' && e.name !== "" && e.name?.toLowerCase() !== "unknown hotel" && e.name !== undefined)) {
                        return null;
                    }
                    console.log(e.dataa)
                    return (
                        <RenderItem e={e}/>
                    )
                })}
            </div>
        </>
    )
}

export default Hotels
