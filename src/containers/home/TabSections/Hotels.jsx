import React, { useRef, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs';
import { RiSendPlane2Line } from 'react-icons/ri';
import hotel from '../../../api/projectApi/hotel';
import hotelsTownLists from '../../../constants/hotelsTownLists';

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [values, setValues] = useState({
        town: null,
        datebeg: null,
        dateend: null
    })

    const handlePressFind = () => {
        console.log("asdasd")
        hotel.getHotels(values.town)
            .then(r => {
                setHotels(r.data?.Response?.Data[0]?.hotel)
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
                                        setValues({ ...values, town: e.target.value })
                                    }}
                                >
                                    {hotelsTownLists.map(e => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <RiSendPlane2Line className="text-white w-10" />
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
                                <label htmlFor="date" className="block text-white text-sm">
                                    Гости и номера
                                </label>
                                <input
                                    type="text"
                                    className="p-2 rounded border-4 border-red-600 w-full"
                                    placeholder="Взрослых: 2, Номеров: 1"
                                    name="date"
                                    id="date"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handlePressFind}
                                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                                Найти <BsArrowRightShort className="lh-0 text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                {hotels.map(e => {
                    return e['$'].status !== 'D' && e['$'].name !== "" && e['$'].name?.toLowerCase() !== "unknown hotel" && e['$'].name !== undefined && (
                        <div className="shadow border rounded-lg bg-white p-2 flex gap-5" key={`${e['$'].inc}`}>
                            <img className="rounded" width="200" src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e['$'].inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`} alt="" />
                            <div>
                                <h1 className="text-xl font-bold">{e['$'].name}</h1>
                                {hotelsTownLists.map(a => {
                                    return a.id === e['$'].town && (
                                        <p className="text-sm">{a.title}</p>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Hotels