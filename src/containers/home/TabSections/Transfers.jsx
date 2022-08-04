import React, {useState} from 'react'
import {BsArrowRightShort} from 'react-icons/bs'
import {RiSendPlane2Line} from 'react-icons/ri'

function Transfers() {

    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto py-44">
            <div
                className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                <div className="flex gap-2 items-center py-4 text-gray-600">
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Страна
                        </label>
                        <input
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="text"
                            name="from"
                            placeholder="- выбрать -"
                            id="from"
                        />
                    </div>
                    <RiSendPlane2Line className="text-white w-10"/>
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Тип визы
                        </label>
                        <input
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="text"
                            name="from"
                            placeholder="- выбрать -"
                            id="from"
                        />
                    </div>
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
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                        Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Transfers
