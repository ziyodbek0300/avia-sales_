import React, {useRef, useState} from 'react';
import {RiSendPlane2Line} from "react-icons/ri";
import {BsArrowRightShort} from "react-icons/bs";
import {DatePicker} from 'rsuite'
import ReactSelect from 'react-select';
import {FaPlaneArrival, FaPlaneDeparture} from "react-icons/fa";
import {dubai_tashkent, tashkent_dubai} from "../../../constants/flights";
import QanotSharq from "../../../static/images/qanot-sharq.jpg";
import Moment from 'moment';
import {extendMoment} from 'moment-range';

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

    const showTickets = () => {
        const range = moment.range(day1, day2);
        const ranges = Array.from(range.by('day', {excludeEnd: true, step: 1}));
        console.log(ranges);
        // ranges.map(a => console.log(a))
        Array(9).fill(null).map(s => {
            setTickets([...tickets, {
                direction: [from, to],
                departureTime: from + "_" + to.startsWith("tashkent") ? tashkent_dubai.departureTime : dubai_tashkent.departureTime,
                arrivingTime: from + "_" + to.startsWith("tashkent") ? tashkent_dubai.arrivingTime : dubai_tashkent.arrivingTime,
                price: 310 * (+adults + +infant + +children)
            }]);
        })
    }

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
            padding: 20,
        }),

        control: (_, {selectProps: {width}}) => ({
            width: width
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return {...provided, opacity, transition};
        }
    }

    return (<div>
        <div className="header">
            <div className="max-w-5xl mx-auto py-44">
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
                                onChange={(e) => {
                                    setFrom(e.value)
                                }}
                                style={{border: '1px solid red'}}
                                options={[{value: '', label: '- выбрать -'}, {
                                    value: 'tashkent', label: 'Ташкент (TAS)'
                                }, {value: 'dubai', label: 'Дубай (DXB)'},]}
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
                                    setTo(e.value)
                                }}
                                options={[{value: '', label: '- выбрать -'}, {
                                    value: 'dubai', label: 'Дубай (DXB)'
                                }, {value: 'tashkent', label: 'Ташкент (TAS)'},]}
                                placeholder="- выбрать -"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Туда
                            </label>
                            <DatePicker
                                disabledDate={date => date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 4 || date.getDay() === 5 || date.getDay() === 6}
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
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Обратно
                            </label>
                            <DatePicker
                                disabledDate={date => date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 4 || date.getDay() === 5 || date.getDay() === 3}
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
                        </div>
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
            {tickets.map((a, b) => (
                <div className={"p-3 mb-3 shadow hover:shadow-md cursor-pointer transition-all rounded-lg border flex"}>
                    <div className={"w-full px-2 pr-5"}>
                        <div className={"flex items-center justify-between"}>
                            <img src={QanotSharq} alt="asd" width={150} className={"mb-3"}/>
                            <p className={"font-bold mb-3"}>Ekonom</p>
                        </div>
                        <div className={"flex justify-between"}>
                    <span className={"text-lg"} style={{lineHeight: 1.2}}>
                        <span className={"text-xl font-normal"} style={{lineHeight: 0}}>{a.departureTime}</span><br/>
                        <span className={"text-xs"} style={{lineHeight: 0}}>12.12.2002</span><br/>
                        <span className={"capitalize"}>{a.direction[0]}</span>
                    </span>
                            <div
                                className={"flex w-full bg-red-500 text-white mx-3 justify-between px-6 rounded border-b-2 border-dotted border-gray-500 h-10 align-bottom p-3"}>
                                <FaPlaneDeparture className={"text-2xl text-white"}/>
                                <p className={"text-xs p-0 m-0"}>В пути: 3 часа 10 минут</p>
                                <FaPlaneArrival className={"text-2xl text-white"}/>
                            </div>
                            <span className={"text-lg"} style={{lineHeight: 1.2}}>
                        <span className={"text-xl font-normal"} style={{lineHeight: 0}}>{a.arrivingTime}</span><br/>
                        <span className={"text-xs"} style={{lineHeight: 0}}>12.12.2002</span><br/>
                            <span className={"capitalize"}>{a.direction[1]}</span>
                    </span>
                        </div>
                    </div>
                    <div className={"border-l p-3 flex justify-center items-center w-60"}>
                        <p className={"text-2xl font-bold text-red-500"}>{a.price}$</p>
                    </div>
                </div>))}
        </div>
    </div>);
}

export default Flights
