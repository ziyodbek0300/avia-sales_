import React, {useRef, useState} from 'react'
import {BsArrowRightShort} from 'react-icons/bs';
import {RiSendPlane2Line} from 'react-icons/ri';
import hotel from '../../../api/projectApi/hotel';
import hotelsTownLists from '../../../constants/hotelsTownLists';
import {toast} from "react-toastify";


const RenderItem = ({e}) => {
    const [values,setValues]=useState({
        loading:false,
        data:[],
        open:false
    })
    const handlePress = async () => {
        setValues({
            data: [],
            loading: true,
            open:!values.open
        })
        if (!values.open){
            const data = await hotel.getPrice(477).catch(e=>{
                setValues({
                    ...values,
                    loading: false,
                    open: true,
                })
            })
            if (data.status===200){
                setValues({
                    open: true,
                    loading: false,
                    data: data.data,
                })
                console.log(data.data)
            } else {
                toast("Get error",{type:'warning'})
            }
        }
    }
    return (
        <div onClick={handlePress} className="shadow border rounded-lg cursor-pointer bg-white p-2 flex gap-5"
             key={`${e['$'].inc}`}>
            <img className="rounded" width="200" style={{maxHeight:'200px'}}
                 src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e['$'].inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                 alt=""/>
            <div>
                <h1 className="text-xl font-bold">{e['$'].name}</h1>
                {hotelsTownLists.map(a => {
                    return a.id === e['$'].town && (
                        <p className="text-sm">{a.title}</p>
                    )
                })}
                start count {e["$"].star}
                <br/>
                {values.open?(
                    <div>
                        {
                            values.loading?(
                                <div>
                                    loading...
                                </div>
                            ):(
                                <div>
                                    asdasdasdasd
                                    {JSON.stringify(values)}
                                    {
                                        values.data.map(e=>{
                                            console.log("asdas")
                                            return (
                                                <div>
                                                    asdasd
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                asdasd
                    </div>
                ):null}

            </div>
        </div>
    )
}

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [values, setValues] = useState({
        town: hotelsTownLists[0].id,
        datebeg: null,
        dateend: null
    })
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handlePressFind = () => {
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
                                        setValues({...values, town: e.target.value})
                                    }}
                                >
                                    {hotelsTownLists.map(e => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <RiSendPlane2Line className="text-white w-10"/>
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
                                onClick={handlePressFind}
                                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm">
                                Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                {hotels.map(e => {
                    return e['$'].status !== 'D' && e['$'].name !== "" && e['$'].name?.toLowerCase() !== "unknown hotel" && e['$'].name !== undefined && (
                        <RenderItem e={e}/>
                    )
                })}
            </div>
        </>
    )
}

export default Hotels
