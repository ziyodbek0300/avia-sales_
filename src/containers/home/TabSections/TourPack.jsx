import React, { useState } from 'react';
import { RiSendPlane2Line } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";
import { DatePicker } from 'rsuite'
import ReactSelect from 'react-select';

function TourPack() {
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto py-44">
            <div
                className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <input type="radio" name="t1" id="t1" />
                        <label htmlFor="t1">Сложный маршрут</label>
                    </div>
                </div>
                <div className="flex gap-2 items-center py-4 text-gray-600">
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Откуда
                        </label>
                        <ReactSelect
                            style={{ border: '1px solid red' }}
                            options={[
                                { value: '', label: '- выбрать -' },
                                { value: 'Ташкент', label: 'Ташкент' },
                                { value: 'Шаржах', label: 'Шаржах' },
                            ]}
                            placeholder="- выбрать -"
                        />
                        {/* <select
                            name="from"
                            id="from"
                            className="p-2 rounded border-4 border-red-600 w-full"
                        >
                            <option disabled selected value=""></option>
                            <optgroup label="Dubai" className="font-bold">
                                <option value={"Sharja"}>Шаржах</option>
                            </optgroup>
                            <optgroup label="Uzbekistan" className="font-bold">
                                <option value={"tashkent"}>Ташкент</option>
                            </optgroup>
                        </select> */}
                    </div>
                    <RiSendPlane2Line className="text-white w-10" />
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Направление
                        </label>
                        <ReactSelect
                            options={[
                                { value: '', label: '- выбрать -' },
                                { value: 'Ташкент', label: 'Ташкент' },
                                { value: 'Шаржах', label: 'Шаржах' },
                            ]}
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
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="text"
                            name="from"
                            placeholder="2, Эконом"
                            id="from"
                        />
                        {isOpen ? (
                            <div className="absolute top-full -left-20">
                                <div className="bg-white rounded-lg p-1 tooltip-in relative mt-5 w-80 shadow">
                                    <div className="flex p-3">
                                        <div className="w-full">
                                            <p>Взрослые <br />
                                                Старше 12 лет</p>
                                        </div>
                                        <div className="flex w-full">
                                            <button onClick={() => setAdults(prev => prev -= 1)} className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-</button>
                                            <input type="number" value={adults} onInput={(e) => setAdults(+e.target.value)} className="border-0 text-center p-2 w-1/2 outline-none bg-transparent" />
                                            <button onClick={() => setAdults(prev => prev += 1)} className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+</button>
                                        </div>
                                    </div>
                                    <div className="flex p-3">
                                        <div className="w-full">
                                            <p>Дети <br />
                                                От 2 до 12 лет</p>
                                        </div>
                                        <div className="flex w-full">
                                            <button onClick={() => setChildren(prev => prev -= 1)} className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-</button>
                                            <input type="number" value={children} onInput={(e) => setChildren(prev => +e.target.value)} className="text-center border-0 p-2 w-1/2 outline-none bg-transparent" />
                                            <button onClick={() => setChildren(prev => prev += 1)} className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+</button>
                                        </div>
                                    </div>
                                    <div className="flex p-3">
                                        <div className="w-full">
                                            <p>Младенцы <br />
                                                До 2 лет </p>
                                        </div>
                                        <div className="flex w-full">
                                            <button onClick={() => setInfant(prev => prev -= 1)} className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">-</button>
                                            <input type="number" value={infant} onInput={(e) => setInfant(prev => +e.target.value)} className="text-center border-0 p-2 w-1/2 outline-none bg-transparent" />
                                            <button onClick={() => setInfant(prev => prev += 1)} className="w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl">+</button>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        ) : ""}
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
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-800 text-white text-sm">
                        Найти <BsArrowRightShort className="lh-0 text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TourPack