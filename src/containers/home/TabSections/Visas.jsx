import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { RiSendPlane2Line } from 'react-icons/ri'

function Visas() {
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
                    <RiSendPlane2Line className="text-white w-10" />
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
                    <div className="w-full">
                        <label htmlFor="from" className="block text-white text-sm">
                            Количество туристов
                        </label>
                        <input
                            className="p-2 rounded border-4 border-red-600 w-full"
                            type="text"
                            name="from"
                            placeholder="- выбрать -"
                            id="from"
                        />
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

export default Visas