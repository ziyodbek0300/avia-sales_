import React, {useEffect, useRef, useState} from 'react';
import {RiSendPlane2Line} from "react-icons/ri";
import {BsArrowRightShort} from "react-icons/bs";
import {DatePicker} from 'rsuite'
import ReactSelect from 'react-select';
import {FaPlaneArrival, FaPlaneDeparture} from "react-icons/fa";
import {dubai_tashkent, tashkent_dubai} from "../../../constants/flights";
import QanotSharq from "../../../static/images/qanot-sharq.jpg";
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import regions from "../../../api/projectApi/regions";
import {useDispatch, useSelector} from "react-redux";
import {getAllFlights} from "../../../redux/flights/actions";
import {NavLink} from "react-router-dom";

function Flights() {
    const moment = extendMoment(Moment);
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [tickets, setTickets] = useState([]);
    const [day1, setDay1] = useState("");
    const [day2, setDay2] = useState("");
    const [regionsList, setRegionsList] = useState([]);
    const flights = useSelector(state => state.flights.flights)
    const [regs, setRegs] = useState([]);
    const dispatch = useDispatch();
    const [wd, setWd] = useState([]);
    const [wd1, setWd1] = useState([]);
    const [obratno, setObratno] = useState(false);

    useEffect(() => {
        regions.getAllRegions().then(res => {
            setRegs(res.data.result);
            setRegionsList(res.data.result.map(r => {
                return {value: r.id, label: r.name}
            }))
        })
        dispatch(getAllFlights())
    }, []);

    const showTickets = () => {
        // console.log(from.label, flights[0].fromName);
        // eslint-disable-next-line array-callback-return
        flights.map(flight => {
            if (flight.fromName === from.label && flight.toName === to.label) {
                setTickets([...tickets, flight]);
            }
        })
    }

    const getDays = () => {
        // eslint-disable-next-line array-callback-return
        flights.map(reg => {
            if (reg.fromName === from.label && reg.toName === to.label) {
                setWd(() => reg.weekDays);
            } else if (reg.fromName === to.label && reg.toName === from.label) {
                setWd1(() => reg.weekDays)
            }
        })
    };

    return (<div>
        <div className="header">
            <div className="max-w-5xl mx-auto py-44">
                <div
                    className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <input type="checkbox"
                                   onChange={() => setObratno(!obratno)}
                                   value={obratno}
                                   className={"w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}
                                   name="t1" id="t1"/>
                            <label htmlFor="t1"
                                   className={"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"}>Обратно</label>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center py-4 text-gray-600">
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Откуда
                            </label>
                            <ReactSelect
                                onChange={(e) => {
                                    setFrom(() => e)
                                }}
                                style={{border: '1px solid red'}}
                                options={[{value: '', label: '- выбрать -'}, ...regionsList]}
                                placeholder="- выбрать -"
                            />
                        </div>
                        <RiSendPlane2Line className="text-white w-10"/>
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Направление
                            </label>
                            <ReactSelect
                                style={{border: '1px solid red'}}
                                onChange={(e) => {
                                    setTo(() => e)
                                }}
                                options={[{value: '', label: '- выбрать -'}, ...regionsList]}
                                placeholder="- выбрать -"
                            />
                        </div>
                        <div className="w-full" onMouseEnter={() => getDays()}>
                            <label htmlFor="from" className="block text-white text-sm">
                                Туда
                            </label>
                            <DatePicker
                                disabledDate={date => {
                                    if (wd.length === 2) {
                                        return date.getDay() !== wd[0] && date.getDay() !== wd[1]
                                    } else if (wd.length === 1) {
                                        return date.getDay() !== wd[0]
                                    } else if (wd.length === 3) {
                                        return date.getDay() !== wd[0] && date.getDay() !== wd[1] && date.getDay() !== wd[2]
                                    } else if (wd.length === 4) {
                                        return date.getDay() !== wd[0] && date.getDay() !== wd[1] && date.getDay() !== wd[2] && date.getDay() !== wd[3]
                                    } else if (wd.length === 5) {
                                        return date.getDay() !== wd[0] && date.getDay() !== wd[1] && date.getDay() !== wd[2] && date.getDay() !== wd[3] && date.getDay() !== wd[4]
                                    } else if (wd.length === 6) {
                                        return date.getDay() !== wd[0] && date.getDay() !== wd[1] && date.getDay() !== wd[2] && date.getDay() !== wd[3] && date.getDay() !== wd[4] && date.getDay() !== wd[5]
                                    } else if (wd.length === 7) {
                                        return date.getDay() !== wd[0] && date.getDay() !== wd[1] && date.getDay() !== wd[2] && date.getDay() !== wd[3] && date.getDay() !== wd[4] && date.getDay() !== wd[5] && date.getDay() !== wd[6]
                                    }
                                }}
                                onChange={(e) => setDay1(new Date(e))}
                                format="yyyy-MM-dd"
                                style={{
                                    width: '100%',
                                    border: '4px solid rgb(220 38 38)',
                                    borderRadius: '4px',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                        {obratno ? <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Обратно
                            </label>
                            <DatePicker
                                disabledDate={date => {
                                    if (wd1.length === 2) {
                                        return date.getDay() !== wd1[0] && date.getDay() !== wd1[1]
                                    } else if (wd1.length === 1) {
                                        return date.getDay() !== wd1[0]
                                    } else if (wd1.length === 3) {
                                        return date.getDay() !== wd1[0] && date.getDay() !== wd1[1] && date.getDay() !== wd1[2]
                                    } else if (wd1.length === 4) {
                                        return date.getDay() !== wd1[0] && date.getDay() !== wd1[1] && date.getDay() !== wd1[2] && date.getDay() !== wd1[3]
                                    } else if (wd1.length === 5) {
                                        return date.getDay() !== wd1[0] && date.getDay() !== wd1[1] && date.getDay() !== wd1[2] && date.getDay() !== wd1[3] && date.getDay() !== wd1[4]
                                    } else if (wd1.length === 6) {
                                        return date.getDay() !== wd1[0] && date.getDay() !== wd1[1] && date.getDay() !== wd1[2] && date.getDay() !== wd1[3] && date.getDay() !== wd1[4] && date.getDay() !== wd1[5]
                                    } else if (wd1.length === 7) {
                                        return date.getDay() !== wd1[0] && date.getDay() !== wd1[1] && date.getDay() !== wd1[2] && date.getDay() !== wd1[3] && date.getDay() !== wd1[4] && date.getDay() !== wd1[5] && date.getDay() !== wd1[6]
                                    }
                                }}
                                format="yyyy-MM-dd"
                                onChange={(e) => {
                                    setDay2(new Date(e));
                                }}
                                style={{
                                    width: '100%',
                                    border: '4px solid rgb(220 38 38)',
                                    borderRadius: '4px',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div> : ""}
                        <div className="w-full relative">
                            <label htmlFor="from" className="block text-white text-sm">
                                Туристы
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
                            onClick={showTickets}
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-800 text-white text-sm">
                            Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className={"py-3 max-w-5xl m-auto"}>
            {tickets.length === 0 ? <><h4>Позвоните по этим номерам, если вы хотите узнать больше об информации</h4>
                <a>+998941079990</a></> : tickets.map((a, b) => {
                var totalTimeInMin = a.duration;
                let aaa = Math.floor(totalTimeInMin / 60) + ':' + totalTimeInMin % 60;
                return (<NavLink onClick={() => localStorage.setItem("flight", JSON.stringify(a))}
                                 to={`/details/${adults + '_' + children + '_' + infant}`}>
                    <div
                        className={"p-3 mb-3 shadow hover:shadow-md cursor-pointer transition-all rounded-lg border flex"}>
                        <div className={"w-full px-2 pr-5"}>
                            <div className={"flex items-center justify-between"}>
                                <img src={QanotSharq} alt="asd" width={150} className={"mb-3"}/>
                                <p className={"font-bold mb-3"}>Ekonom</p>
                            </div>
                            <div className={"flex justify-between"}>
                <span className={"text-lg"} style={{lineHeight: 1.2}}>
                <span className={"text-xl font-normal"}
                      style={{lineHeight: 0}}>{moment(a.startTime).format("HH:mm")}</span><br/>
                <span className={"text-xs"}
                      style={{lineHeight: 0}}>{moment(a.startTime).format("DD:MM:YYYY")}</span><br/>
                <span className={"capitalize"}>{a.fromName}</span>
                </span>
                                <div
                                    className={"flex w-full bg-red-500 text-white mx-3 justify-between px-6 rounded border-b-2 border-dotted border-gray-500 h-10 align-bottom p-3"}>
                                    <FaPlaneDeparture className={"text-2xl text-white"}/>
                                    <p className={"text-xs p-0 m-0"}>В пути: {aaa}</p>
                                    <FaPlaneArrival className={"text-2xl text-white"}/>
                                </div>
                                <span className={"text-lg"} style={{lineHeight: 1.2}}>
                <span className={"text-xl font-normal"}
                      style={{lineHeight: 0}}>{moment(a.endTime).format("HH:mm")}</span><br/>
                <span className={"text-xs"} style={{lineHeight: 0}}>{moment(a.endTime).format("DD:MM:YYYY")}</span><br/>
                <span className={"capitalize"}>{a.toName}</span>
                </span>
                            </div>
                        </div>
                        <div className={"border-l p-3 flex justify-center items-center w-60"}>
                            <p className={"text-2xl font-bold text-red-500"}>{a.price * (+adults + +children)}$</p>
                        </div>
                    </div>
                </NavLink>)
            })}
        </div>
    </div>);
}

export default Flights
