import React, {useEffect, useState} from 'react';
import {RiSendPlane2Line} from "react-icons/ri";
import {BsArrowRightShort} from "react-icons/bs";
import {DatePicker} from 'rsuite'
import ReactSelect from 'react-select';
import regions from "../../../api/projectApi/regions";
import flights from "../../../api/projectApi/flights";
import hotel from "../../../api/projectApi/hotel";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import hotelsTownLists from "../../../constants/hotelsTownLists";

const RenderItem = ({e}) => {
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
            <div onClick={handlePress} className="cursor-pointer flex"
                 key={`${hotelId}`}>
                <img className="rounded" width="200" style={{maxHeight: '200px'}}
                     src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${hotelId}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                     alt=""/>
                <h1 className="text-xl font-bold">{e.name}</h1>
                {hotelsTownLists.map(a => {
                    return a.id === e.town && (
                        <p className="text-sm">{a.title}</p>
                    )
                })}
                start count {e.starCount}
            </div>

            {values.open ? (
                <>
                    <div className={"flex justify-between"}>
                        <div onClick={() => setValues({...values, tabIndex: 1})}
                             className={"flex justify-center w-10 bg-orange-500"}>
                            photo
                        </div>
                        <div onClick={() => setValues({...values, tabIndex: 0})} className={"w-10 bg-orange-500"}>
                            rooms
                        </div>
                    </div>
                    {values.tabIndex === 0 ? (
                        <div className={"mt-16"}>
                            <form action="">
                                <div>
                                    {
                                        values.loading ? (
                                            <div>
                                                loading...
                                            </div>
                                        ) : (
                                            <div>
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
                        <div className={"flex"}>
                            <img className="rounded" width="150px" style={{maxHeight: '150px'}}
                                 src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                 alt=""/>
                            <img className="rounded" width="150px" style={{maxHeight: '150px'}}
                                 src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=1&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                 alt=""/>
                            <img className="rounded" width="150px" style={{maxHeight: '150px'}}
                                 src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=2&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                 alt=""/>
                        </div>
                    )}
                </>
            ) : null}
        </div>

    )
}

function TourPack() {
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [regionsList, setRegionsList] = useState([]);
    const [flightsList, setFlightsList] = useState([]);
    const handleClick = (e) => {
        e.target.classList.contains("qw1") ? setIsOpen(true) : setIsOpen(false);
    }
    useEffect(() => {
        let arr = [];
        let all = [];
        regions.getAllRegions().then(regions => {
            setRegionsList(regions.data.result.map(reg => {
                return {value: reg.id, regionId: reg.regionId, label: reg.name}
            }));
            regions.data.result.forEach(reg => {
                flightsList.forEach(item => {
                    if (item.fromId === reg.id) {
                        arr.push({...item, fromName: reg.name});
                    }
                })
            })
            regions.data.result.forEach(reg => {
                arr.forEach(item => {
                    if (item.toId === reg.id) {
                        all.push({...item, toName: reg.name});
                    }
                })
            })
        });
        setFlightsList(all);
    }, []);

    const [hotels, setHotels] = useState([]);

    const handleSearch = () => {
        if (from?.value && to?.value) {
            flights.search(from.value, to.value,to.regionId)
                .then(r => {
                    if (Array.isArray(r.data) && r.data?.length > 0) {
                        setHotels(r.data)
                    } else {
                        setHotels([])
                        toast("Турпакет не найден", {type: "info"})
                    }
                })
                .catch(e => {
                    toast(e.message, {type: "error"})
                })
        }
    }

    return (
        <>
            <div className="header second" onClick={handleClick}>
                <div className="max-w-5xl mx-auto py-52">
                    <div
                        className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <input type="radio" name="t1" id="t1"/>
                                <label htmlFor="t1">Сложный маршрут</label>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center py-4 text-gray-600">
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    Откуда
                                </label>
                                <ReactSelect
                                    style={{border: '1px solid red'}}
                                    options={[{value: '', label: '- выбрать -'}, ...regionsList]}
                                    placeholder="- выбрать -"
                                    value={from?.id}
                                    onChange={(newValue) => {
                                        setFrom(newValue)
                                    }}
                                />
                            </div>
                            <RiSendPlane2Line className="text-white w-10"/>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    Направление
                                </label>
                                <ReactSelect
                                    options={[{value: '', label: '- выбрать -'}, ...regionsList]}
                                    placeholder="- выбрать -"
                                    value={to?.id}
                                    onChange={(newValue) => {
                                        setTo(newValue)
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    Туда
                                </label>
                                <DatePicker
                                    disabledDate={date => date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 4 || date.getDay() === 5 || date.getDay() === 6}
                                    format="yyyy-MM-dd"
                                    style={{
                                        width: '100%',
                                        border: '4px solid rgb(220 38 38)',
                                        borderRadius: '4px',
                                        backgroundColor: 'white'
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    Обратно
                                </label>
                                <DatePicker
                                    disabledDate={date => date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 4 || date.getDay() === 5 || date.getDay() === 3}
                                    format="yyyy-MM-dd"
                                    style={{
                                        width: '100%',
                                        border: '4px solid rgb(220 38 38)',
                                        borderRadius: '4px',
                                        backgroundColor: 'white'
                                    }}
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
                                    className="p-2 rounded border-4 qw1 border-red-600 w-full"
                                    type="text"
                                    name="from"
                                    placeholder="2, Эконом"
                                    id="from"
                                />
                                {isOpen ? (<div className="absolute qw1 top-full -left-20">
                                    <div className="bg-white qw1 rounded-lg p-1 tooltip-in relative mt-5 w-80 shadow">
                                        <div className="flex qw1 p-3">
                                            <div className="qw1 w-full">
                                                <p className={"qw1"}>Взрослые <br/>
                                                    Старше 12 лет</p>
                                            </div>
                                            <div className="qw1 flex qw1 w-full">
                                                <button onClick={() => setAdults(prev => prev -= 1)}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-
                                                </button>
                                                <input type="number" value={adults}
                                                       onInput={(e) => setAdults(+e.target.value)}
                                                       className="qw1 border-0 text-center p-2 w-1/2 outline-none bg-transparent"/>
                                                <button onClick={() => setAdults(prev => prev += 1)}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+
                                                </button>
                                            </div>
                                        </div>
                                        <div className="qw1 flex p-3">
                                            <div className="qw1 w-full">
                                                <p className={"qw1"}>Дети <br/>
                                                    От 2 до 12 лет</p>
                                            </div>
                                            <div className="qw1 flex w-full">
                                                <button onClick={() => setChildren(prev => prev -= 1)}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-
                                                </button>
                                                <input type="number" value={children}
                                                       onInput={(e) => setChildren(prev => +e.target.value)}
                                                       className="qw1 text-center border-0 p-2 w-1/2 outline-none bg-transparent"/>
                                                <button onClick={() => setChildren(prev => prev += 1)}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+
                                                </button>
                                            </div>
                                        </div>
                                        <div className="qw1 flex p-3">
                                            <div className="qw1 w-full">
                                                <p className={"qw1"}>Младенцы <br/>
                                                    До 2 лет </p>
                                            </div>
                                            <div className="qw1 flex w-full">
                                                <button onClick={() => setInfant(prev => prev -= 1)}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-
                                                </button>
                                                <input type="number" value={infant}
                                                       onInput={(e) => setInfant(prev => +e.target.value)}
                                                       className="qw1 text-center border-0 p-2 w-1/2 outline-none bg-transparent"/>
                                                <button onClick={() => setInfant(prev => prev += 1)}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>) : ""}
                            </div>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    Трансфер
                                </label>
                                <select
                                    name=""
                                    className="p-2 rounded border-4 border-red-600 w-full"
                                    id=""
                                >
                                    <option value="">Групповой</option>
                                    <option value="">Индивидуальный</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleSearch}
                                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-800 text-white text-sm">
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
                    return (
                        <RenderItem e={e}/>
                    )
                })}
            </div>
        </>
    )
}

export default TourPack
