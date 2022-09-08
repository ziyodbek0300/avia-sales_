import React, {useState} from 'react';
import {RiSendPlane2Line} from "react-icons/ri";
import {BsArrowRightShort} from "react-icons/bs";
import ReactSelect from 'react-select';
import moment from "moment/moment";
import exTour from "../../../constants/exTour";

function ExcursionTours() {
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    console.log(moment('2022-09-17').toDate())
    return (
        <div className="max-w-5xl mx-auto py-44">
            <div className={"flex justify-between gap-5"}>
                {exTour.map(a => {
                    return (
                        <div className={"border-2 border-red-500 bg-white/40 text-white w-full p-4 rounded-lg bg-white/90 backdrop-blur-lg"}>
                            <p className={"text-2xl font-bold"}>{a.name}</p>
                            <p>{a.typeOfEx}</p>
                            <p>{a.price}</p>
                            <p>{a.hotelStars}</p>
                            <button className={"bg-red-500 text-white px-4 py-2 mt-3"}>Заказать</button>
                        </div>
                    )
                })}
            </div>
            {/*<div*/}
            {/*    className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">*/}
            {/*    <div className="flex items-center gap-3">*/}
            {/*        <div className="flex items-center gap-1">*/}
            {/*            <input type="radio" name="t1" id="t1"/>*/}
            {/*            <label htmlFor="t1">Сложный маршрут</label>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="flex gap-2 items-center py-4 text-gray-600">*/}
            {/*        <div className="w-full">*/}
            {/*            <label htmlFor="from" className="block text-white text-sm">*/}
            {/*                Откуда*/}
            {/*            </label>*/}
            {/*            <ReactSelect*/}
            {/*                style={{border: '1px solid red'}}*/}
            {/*                options={[*/}
            {/*                    {value: '', label: '- выбрать -'},*/}
            {/*                    {value: 'tashkent', label: 'Ташкент (TAS)'},*/}
            {/*                    {value: 'dubai', label: 'Дубай (DXB)'},*/}
            {/*                ]}*/}
            {/*                placeholder="- выбрать -"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <RiSendPlane2Line className="text-white w-10"/>*/}
            {/*        <div className="w-full">*/}
            {/*            <label htmlFor="from" className="block text-white text-sm">*/}
            {/*                Направление*/}
            {/*            </label>*/}
            {/*            <ReactSelect*/}
            {/*                style={{border: '1px solid red'}}*/}
            {/*                options={[*/}
            {/*                    {value: '', label: '- выбрать -'},*/}
            {/*                    {value: 'tashkent', label: 'Ташкент (TAS)'},*/}
            {/*                    {value: 'dubai', label: 'Дубай (DXB)'},*/}
            {/*                ]}*/}
            {/*                placeholder="- выбрать -"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="w-full">*/}
            {/*            <label htmlFor="from" className="block text-white text-sm">*/}
            {/*                Туда*/}
            {/*            </label>*/}
            {/*            <input*/}
            {/*                className="p-2 rounded border-4 border-red-600 w-full"*/}
            {/*                type="date"*/}
            {/*                name="from"*/}
            {/*                placeholder="- выбрать -"*/}
            {/*                id="from"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="w-full">*/}
            {/*            <label htmlFor="from" className="block text-white text-sm">*/}
            {/*                Обратно*/}
            {/*            </label>*/}
            {/*            <input*/}
            {/*                className="p-2 rounded border-4 border-red-600 w-full"*/}
            {/*                type="date"*/}
            {/*                name="from"*/}
            {/*                placeholder="- выбрать -"*/}
            {/*                id="from"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="w-full relative">*/}
            {/*            <label htmlFor="date" className="block text-white text-sm">*/}
            {/*                Гости и номера*/}
            {/*            </label>*/}
            {/*            <input*/}
            {/*                autoComplete={"off"}*/}
            {/*                value={"В:" + adults + " М:" + infant + " Д:" + children + ", Эконом"}*/}
            {/*                onClick={() => setIsOpen(!isOpen)}*/}
            {/*                onChange={() => console.log('as')}*/}
            {/*                className="p-2 rounded border-4 border-red-600 w-full"*/}
            {/*                type="text"*/}
            {/*                name="from"*/}
            {/*                placeholder="2, Эконом"*/}
            {/*                id="from"*/}
            {/*            />*/}
            {/*            {isOpen ? (<div className="absolute top-full -left-20">*/}
            {/*                <div className="bg-white rounded-lg p-1 tooltip-in relative mt-5 w-80 shadow">*/}
            {/*                    <div className="flex p-3">*/}
            {/*                        <div className="w-full">*/}
            {/*                            <p>Взрослые <br/>*/}
            {/*                                Старше 12 лет</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="flex w-full">*/}
            {/*                            <button onClick={() => setAdults(prev => prev -= 1)}*/}
            {/*                                    className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-*/}
            {/*                            </button>*/}
            {/*                            <input type="number" value={adults}*/}
            {/*                                   onInput={(e) => setAdults(+e.target.value)}*/}
            {/*                                   className="border-0 text-center p-2 w-1/2 outline-none bg-transparent"/>*/}
            {/*                            <button onClick={() => setAdults(prev => prev += 1)}*/}
            {/*                                    className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+*/}
            {/*                            </button>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="flex p-3">*/}
            {/*                        <div className="w-full">*/}
            {/*                            <p>Дети <br/>*/}
            {/*                                От 2 до 12 лет</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="flex w-full">*/}
            {/*                            <button onClick={() => setChildren(prev => prev -= 1)}*/}
            {/*                                    className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-*/}
            {/*                            </button>*/}
            {/*                            <input type="number" value={children}*/}
            {/*                                   onInput={(e) => setChildren(prev => +e.target.value)}*/}
            {/*                                   className="text-center border-0 p-2 w-1/2 outline-none bg-transparent"/>*/}
            {/*                            <button onClick={() => setChildren(prev => prev += 1)}*/}
            {/*                                    className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+*/}
            {/*                            </button>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="flex p-3">*/}
            {/*                        <div className="w-full">*/}
            {/*                            <p>Младенцы <br/>*/}
            {/*                                До 2 лет </p>*/}
            {/*                        </div>*/}
            {/*                        <div className="flex w-full">*/}
            {/*                            <button onClick={() => setInfant(prev => prev -= 1)}*/}
            {/*                                    className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-*/}
            {/*                            </button>*/}
            {/*                            <input type="number" value={infant}*/}
            {/*                                   onInput={(e) => setInfant(prev => +e.target.value)}*/}
            {/*                                   className="text-center border-0 p-2 w-1/2 outline-none bg-transparent"/>*/}
            {/*                            <button onClick={() => setInfant(prev => prev += 1)}*/}
            {/*                                    className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+*/}
            {/*                            </button>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>) : ""}*/}
            {/*        </div>*/}
            {/*        <div className="w-full">*/}
            {/*            <label htmlFor="from" className="block text-white text-sm">*/}
            {/*                Трансфер*/}
            {/*            </label>*/}
            {/*            <select*/}
            {/*                name=""*/}
            {/*                className="p-2 rounded border-4 border-red-600 w-full"*/}
            {/*                id=""*/}
            {/*            >*/}
            {/*                <option value="">Групповой</option>*/}
            {/*                <option value="">Индивидуальный</option>*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center justify-end">*/}
            {/*        <button*/}
            {/*            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">*/}
            {/*            Найти <BsArrowRightShort className="lh-0 text-2xl"/>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default ExcursionTours
