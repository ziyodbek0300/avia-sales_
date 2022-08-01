import React, { useState } from 'react';
import { RiSendPlane2Line } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";
import { DatePicker } from 'rsuite'
import ReactSelect from 'react-select';

function ExcursionTours() {
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
                    </div>
                    <RiSendPlane2Line className="text-white w-10" />
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Направление
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
                    </div>
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Туда
                        </label>
                        <input
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="date"
                            name="from"
                            placeholder="- выбрать -"
                            id="from"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Обратно
                        </label>
                        <input
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="date"
                            name="from"
                            placeholder="- выбрать -"
                            id="from"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Туристы
                        </label>
                        <input
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="text"
                            name="from"
                            placeholder="2, Эконом"
                            id="from"
                        />
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
                        className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                        Найти <BsArrowRightShort className="lh-0 text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExcursionTours