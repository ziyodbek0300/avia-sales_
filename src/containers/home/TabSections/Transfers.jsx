import React, {useEffect, useState} from 'react'
import {BsArrowRightShort} from 'react-icons/bs'
import ReactSelect from "react-select";
import hotelsTownLists from "../../../constants/hotelsTownLists";
import regions from "../../../api/projectApi/regions";
import moment from "moment";
import {useNavigate} from "react-router-dom";

function Transfers() {
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [city, setCity] = useState({});
    const [from, setFrom] = useState("");
    const [data, setData] = useState("")
    const [transfers, setTransfers] = useState([])
    const [regionsList, setRegionsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        regions.getAllRegions().then(res => {
            setRegionsList(res.data.result.map(r => {
                return {value: r.id, label: r.name}
            }))
        })
    }, []);

    const cities = hotelsTownLists.map(a => {
        return {value: a.id, label: a.title}
    })

    const transfer = () => {
        console.log(adults, infant, children)
        let price = 100;
        let countPassegers = +adults + +children;
        // eslint-disable-next-line no-mixed-operators
        if (4 <= countPassegers && countPassegers <= 8) {
            price = 130;
        } else if (8 < countPassegers && countPassegers <= 14) {
            price = 200;
        } else if (15 <= countPassegers && countPassegers <= 50) {
            price = 500;
        }

        setTransfers([...transfers, {
            transferFrom: from.label,
            transferTo: city.label,
            time: moment(data).toDate(),
            passengers: countPassegers,
            price: price,
            phone: '',
            name: ''
        }])
    }

    const order = (obj) => {
        let tr_data = JSON.stringify(obj)
        localStorage.setItem("transfer", tr_data);
        navigate(`/transferDetails/${adults + '_' + children + '_' + infant}`)
    }

    return (<>
        <div className={"header sixtrh pb-10"}>
            <div className="max-w-5xl mx-auto py-44">
                <div
                    className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                    <div className="flex lg:flex-row flex-col gap-2 items-center py-4 text-gray-600">
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Откуда
                            </label>
                            <ReactSelect
                                onChange={(e) => {
                                    setFrom(e)
                                }}
                                style={{border: '1px solid red'}}
                                options={[{value: '', label: '- выбрать -'}, ...regionsList]}
                                placeholder="- выбрать -"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="from" className="block text-white text-sm">
                                Куда
                            </label>
                            <ReactSelect
                                placeholder="- выбрать -"
                                options={cities}
                                id="from"
                                onChange={(e) => setCity(e)}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="date" className="block text-white text-sm">
                                Дата заезда
                            </label>
                            <input
                                required
                                type="datetime-local"
                                className="p-2 rounded border-4 border-red-600 w-full"
                                onChange={(e) => setData(e.target.value)}
                                name="date"
                                id="date"
                            />
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="date" className="block text-white text-sm">
                                Гости и номера
                            </label>
                            <input
                                required
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
                            onClick={transfer}
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                            Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className={"max-w-5xl mx-auto py-3 mt-10"}>
            {
                transfers.map(tr => {
                    return (
                        <div
                            className={"shadow bg-white rounded mb-3 border-red-400 p-3 border flex items-center justify-between px-10"}>
                            <div>
                                <p className={"text-lg"}><span className={"font-bold"}>From:</span> {tr.transferFrom}
                                </p>
                                <p className={"text-lg"}><span className={"font-bold"}>To:</span> {tr.transferTo}</p>
                            </div>
                            <div>
                                <p className={"text-lg"}><span
                                    className={"font-bold"}>Passengers:</span> {tr.passengers}</p>
                            </div>
                            <div className={"text-center"}>
                                <p className={"text-xl"}><span className={"font-bold"}>Price:</span> {tr.price}$</p>
                                <button onClick={() => order(tr)}
                                        className={"p-3 active:opacity-90 px-5 border-red-500 border rounded hover:bg-red-500 hover:text-white transition"}>Заказать
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>)
}

export default Transfers
