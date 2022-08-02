import React, {useState} from 'react';
import {RiSendPlane2Line} from "react-icons/ri";
import {BsArrowRightShort} from "react-icons/bs";
import {DatePicker} from 'rsuite'
import ReactSelect from 'react-select';
import {FaPlaneArrival, FaPlaneDeparture} from "react-icons/fa";

function Flights() {
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const showTickets = () => {
        console.log("asd")
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
                                style={{border: '1px solid red'}}
                                options={[{value: '', label: '- выбрать -'}, {
                                    value: 'Ташкент', label: 'Ташкент'
                                }, {value: 'Шарджа', label: 'Шарджа'},]}
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
                                options={[{value: '', label: '- выбрать -'}, {
                                    value: 'Ташкент', label: 'Ташкент'
                                }, {value: 'Шарджа', label: 'Шарджа'},]}
                                placeholder="- выбрать -"
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
        <div className={"grid grid-cols-2 gap-3 py-3 max-w-5xl m-auto"}>
            {Array(10).fill(null).map((a, b) => <div className={"flex p-3 shadow-sm rounded-lg border justify-between"}>
                <span className={"text-lg font-bold"}>
                    <span className={"text-sm font-normal"}>05:30</span><br />
                    <span className={"text-xs"}>12.12.2002</span><br />
                    Tash
                </span>
                <div className={"flex w-full justify-between px-6 border-b-2 border-gray-500 h-14 p-3"}>
                    <FaPlaneDeparture className={"text-2xl text-gray-700 mb-3"}/>
                    <FaPlaneArrival className={"text-2xl text-gray-700 mb-3"}/>
                </div>
                <span className={"text-lg font-bold"}>
                    <span className={"text-sm font-normal"}>05:30</span><br />
                    <span className={"text-xs"}>12.12.2002</span><br />
                    SHj
                </span>
            </div>)}
        </div>
    </div>);
}

export default Flights