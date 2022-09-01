import React, {useState} from 'react'
import {BsArrowRightShort} from 'react-icons/bs'
import {RiSendPlane2Line} from 'react-icons/ri'
import {VISAS, VISA_STATE, VISA_PRICE} from '../../../constants/visas'
import {DateRangePicker} from 'rsuite'
import {DateRange} from "react-date-range";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";

function Visas() {
    const navigate = useNavigate();
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [visaType, setVisaType] = useState(0);
    const [location, setLocation] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState("")
    const [visas, setVisas] = useState([]);

    const visaFunc = (e) => {
        e.preventDefault();
        console.log({
            visaType: visaType,
            location: location,
            date: date,
            passengers: []
        })
        let price = 100;
        let countPassegers = +adults + +children;
        // eslint-disable-next-line no-mixed-operators

        price = VISA_PRICE[visaType] * countPassegers;

        setVisas([...visas, {
            visaType: visaType,
            location: location,
            date: date,
            countPassegers: countPassegers,
            passengers: [],
            price: price,
            phone: '',
            name: ''
        }])
    }

    const order = (obj) => {
        let tr_data = JSON.stringify(obj)
        localStorage.setItem("visa", tr_data);
        navigate(`/visaDetails/${adults + '_' + children + '_' + infant}`)
    }

    return (<>
        <div className={"header fifth"}>
            <div className="max-w-5xl mx-auto py-44">
                <div
                    className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                    <div className="flex gap-2 lg:flex-row flex-col items-center py-4 text-gray-600">
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Страна
                            </label>
                            <select onChange={(e) => setLocation(e.target.value)}
                                    className='p-2 rounded border-4 border-red-600 w-full' name="state_from"
                                    id="state_from" placeholder={"- выбрат -"}>
                                {VISA_STATE.map((visa, index) => <option key={visa} value={index}>{visa}</option>)}
                            </select>
                        </div>
                        <RiSendPlane2Line className="text-white w-10"/>
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Тип визы
                            </label>
                            <select onChange={(e) => setVisaType(e.target.value)}
                                    className='p-2 rounded border-4 border-red-600 w-full' name="state_from"
                                    placeholder={"- выбрат -"}
                                    id="state_from">
                                {VISAS.map((visa, index) => <option key={visa} value={index}>{visa}</option>)}
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="date" className="block text-white text-sm">
                                Дата
                            </label>
                            <div className='control-pane'>
                                <div className='control-section'>
                                    <div className='daterangepicker-control-section'>
                                        <input required
                                               type="date"
                                               className="p-2 rounded border-4 border-red-600 w-full"
                                               onChange={(e) => setDate(e.target.value)}
                                               name="date"
                                               id="date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="sa" className="block text-white text-sm">
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
                                id="sa"
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
                            onClick={visaFunc}
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                            Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className={"max-w-5xl mx-auto py-3 mt-10"}>
            {visas.map(tr => {
                return (<div
                    className={"shadow bg-white rounded mb-3 border-red-400 p-3 border flex items-center justify-between px-10"}>
                    <div>
                        <p className={"text-lg"}><span className={"font-bold"}>Виза:</span> {VISA_STATE[tr.location]}
                        </p>
                    </div>
                    <div>
                        <p className={"text-lg"}><span
                            className={"font-bold"}>Passengers:</span> {tr.countPassegers}</p>
                    </div>
                    <div className={"text-center"}>
                        <p className={"text-xl"}><span className={"font-bold"}>Price:</span> {tr.price}$</p>
                        <button onClick={() => order(tr)}
                                className={"p-3 active:opacity-90 px-5 border-red-500 border rounded hover:bg-red-500 hover:text-white transition"}>Заказать
                        </button>
                    </div>
                </div>)
            })}
        </div>
    </>)
}

export default Visas
