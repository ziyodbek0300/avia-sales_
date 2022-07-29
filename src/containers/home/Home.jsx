import React, { useState } from "react";
import bgImg from "../../static/images/1.jpg";
// import bgImg2 from '../../static/images/2-min.jpg';
import bgImg3 from "../../static/images/3.jpg";
import bgImg5 from "../../static/images/5.jpg";
import bgImg6 from "../../static/images/6-min-min.jpg";
import bgImg7 from "../../static/images/7.jpg";
import bgImg8 from "../../static/images/8.jpg";
import bgImg9 from "../../static/images/9.jpg";
import bgImg11 from "../../static/images/11-min.jpg";
import logo1 from "../../static/images/logo1.png";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FiGrid} from "react-icons/fi";
import {FaHotel} from "react-icons/fa";
import {GrVisa} from "react-icons/gr";
import {GiAirplaneDeparture} from "react-icons/gi";
import {BsArrowRightShort} from "react-icons/bs";
import {RiSendPlane2Line} from "react-icons/ri";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useTranslation} from "react-i18next";
import {VISA_STATE} from "../../constants/visas";
import {DatePicker, DateRangePicker} from "rsuite";
import "rsuite/dist/rsuite.css";
import hotelsTownLists from "../../constants/hotelsTownLists";
import hotel from "../../api/projectApi/hotel";

function Home() {
    const { t, i18n } = useTranslation();
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);

    const [values, setValues] = useState({
        town: null,
        datebeg: null,
        dateend: null
    })

    const [hotels, setHotels] = useState([])

    const handlePressFind = () => {
        console.log("asdasd")
        hotel.getHotels(values.town)
            .then(r => {
                setHotels(r.data?.Response?.Data[0]?.hotel)
            })
            .catch(e=>{
                setHotels([])
            })
    }

    return (
        <div>
            <div className="pt-5">
                <Tabs>
                    <TabList className="flex gap-2 max-w-5xl mx-auto">
                        <Tab
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                            selectedClassName="bg-red-600"
                        >
                            <FiGrid/>
                            Турпакеты
                        </Tab>
                        <Tab
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                            selectedClassName="bg-red-600"
                        >
                            <GiAirplaneDeparture/>
                            Авиабилеты
                        </Tab>
                        <Tab
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                            selectedClassName="bg-red-600"
                        >
                            <FiGrid/>
                            Экскурсионные туры
                        </Tab>
                        <Tab
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                            selectedClassName="bg-red-600"
                        >
                            <FaHotel/>
                            Отели
                        </Tab>
                        <Tab
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                            selectedClassName="bg-red-600"
                        >
                            <GrVisa/>
                            Визы
                        </Tab>
                        <Tab
                            className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-t-lg bg-red-400 text-white text-sm"
                            selectedClassName="bg-red-600"
                        >
                            <GrVisa/>
                            Трансферы
                        </Tab>
                    </TabList>
                    <TabPanel className="header">
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
                                        <select
                                            name="from"
                                            id="from"
                                            className="p-2 rounded border-4 border-red-600 w-full"
                                        >
                                            <option disabled value="">- выбрать -</option>
                                            <optgroup label="Dubai" className="font-bold">
                                                <option value={"Sharja"}>Шаржах</option>
                                            </optgroup>
                                            <optgroup label="Uzbekistan" className="font-bold">
                                                <option value={"tashkent"}>Ташкент</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                    <RiSendPlane2Line className="text-white w-10"/>
                                    <div className="w-full">
                                        <label htmlFor="from" className="block text-white text-sm">
                                            Направление
                                        </label>
                                        <select
                                            name="to"
                                            id="to"
                                            className="p-2 rounded border-4 border-red-600 w-full"
                                        >
                                            <option disabled value="">- выбрать -</option>
                                            <optgroup label="Dubai" className="font-bold">
                                                <option value={"Sharja"}>Шаржах</option>
                                            </optgroup>
                                            <optgroup label="Uzbekistan" className="font-bold">
                                                <option value={"tashkent"}>Ташкент</option>
                                            </optgroup>
                                        </select>
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
                                            className="p-2 rounded border-4 border-red-600 w-full"
                                            type="text"
                                            name="from"
                                            placeholder="2, Эконом"
                                            id="from"
                                        />
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
                                        Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="header second">
                            <div className="max-w-5xl mx-auto py-44">
                                <div
                                    className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <input type="radio" name="t1" id="t1"/>
                                            <label htmlFor="t1">Туда-обратно</label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="radio" name="t2" id="t2"/>
                                            <label htmlFor="t2">В одну сторону</label>
                                            <select className='p-3 rounded border-4 border-red-600 w-full'
                                                    name="state_from" id="state_from">
                                                <option defaultValue="">Выбрать</option>
                                                {VISA_STATE.map(visa => <option key={visa}
                                                                                value={visa}>{visa}</option>)}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="radio" name="t3" id="t3"/>
                                            <label htmlFor="t3">Сложный маршрут</label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center py-4 text-gray-600">
                                        <div className="w-custom">
                                            <label
                                                htmlFor="from"
                                                className="block text-white text-xs"
                                            >
                                                Откуда
                                            </label>
                                            <input
                                                className="p-2 rounded border-4 border-red-600 w-full"
                                                type="text"
                                                name="from"
                                                placeholder="Из Ташкента"
                                                id="from"
                                            />
                                            <DateRangePicker></DateRangePicker>
                                        </div>
                                        <RiSendPlane2Line className="text-white w-10"/>
                                        <div className="w-custom">
                                            <label
                                                htmlFor="from"
                                                className="block text-white text-xs"
                                            >
                                                Направление
                                            </label>
                                            <input
                                                className="p-2 rounded border-4 border-red-600 w-full"
                                                type="text"
                                                name="from"
                                                placeholder="- выбрать -"
                                                id="from"
                                            />
                                        </div>
                                        <div className="w-36">
                                            <label
                                                htmlFor="from"
                                                className="block text-white text-xs"
                                            >
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
                                        <div className="w-36">
                                            <label
                                                htmlFor="from"
                                                className="block text-white text-xs"
                                            >
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
                                            <label
                                                htmlFor="from"
                                                className="block text-white text-xs"
                                            >
                                                Класс обслуживания и пассажиры
                                            </label>
                                            <input
                                                className="p-2 rounded border-4 border-red-600 w-full"
                                                type="text"
                                                name="from"
                                                placeholder="2, Эконом"
                                                id="from"
                                            />
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
                        </div>
                        <div>
                            <div
                                className={"shadow md:shadow-lg w-75"}
                                style={{
                                    width: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    padding: "16px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <img src={logo1} alt="" style={{height: "48px"}}/>
                                    <span>Эконом (B)</span>
                                </div>
                                03:30 TOSHKENT 05:40 DA SHARJA
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="header third">
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
                                        <input
                                            className="p-2 rounded border-4 border-red-600 w-full"
                                            type="text"
                                            name="from"
                                            placeholder="Из Ташкента"
                                            id="from"
                                        />
                                    </div>
                                    <RiSendPlane2Line className="text-white w-10"/>
                                    <div className="w-full">
                                        <label htmlFor="from" className="block text-white text-sm">
                                            Направление
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
                                        Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="">
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
                                                        <option value={e.id}>{e.title}</option>
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
                                            Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {hotels.map(e=>{
                            return (
                                <div>
                                    {e['$'].name}
                                </div>
                            )
                        })}
                    </TabPanel>
                    <TabPanel className="header fifth">
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
                                        Найти <BsArrowRightShort className="lh-0 text-2xl"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="header sixth">ok</TabPanel>
                </Tabs>
            </div>
            <div className={"pb-4 max-w-5xl mx-auto mt-5 text-2xl"}>
                <p className="text-3xl text-gray-500 font-bold mb-3">Лучшие страны</p>
                <div className={"main-courses fw-bold fs-4"}>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl right-3"
                            to="/video/1"
                        >
                            Дубай
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg5})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl right-3"
                            to="/video/1"
                        >
                            Медина
                        </Link>
                    </div>
                </div>
            </div>

            <div className={"pb-4 max-w-5xl mx-auto mt-5 text-2xl"}>
                <div className={"h-80 flex fw-bold gap-3 fs-4"}>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg6})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm font-bold w-full relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3  text-3xl right-3"
                            to="/video/1"
                        >
                            Джидда
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg3})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm w-1/3 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl right-3"
                            to="/video/1"
                        >
                            Абу Даби
                        </Link>
                    </div>
                </div>
            </div>

            <div className={"pb-5 max-w-5xl mx-auto mt-5 text-2xl"}>
                <p className="text-3xl text-gray-500 font-bold mb-3">Все страны</p>
                <div className={"h-80 gap-3 fw-bold fs-4 grid grid-cols-3"}>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg7})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-2xl right-3"
                            to="/video/1"
                        >
                            ОАЭ
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg8})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-2xl right-3"
                            to="/video/1"
                        >
                            Мекка
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg9})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-2xl right-3"
                            to="/video/1"
                        >
                            Саудовская Аравия
                        </Link>
                    </div>
                </div>
            </div>
            <Container className={"max-w-5xl py-10 mx-auto mt-5"}>
                <p className="text-2xl text-gray-500 font-bold mb-3">Все страны</p>
                <div className={"h-80 gap-3 fw-bold fs-4 flex"}>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg11})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative w-full"
                        }
                    ></div>
                    <div className="border border-slate-200 rounded-2xl shadow-sm p-4">
                        <h1 className="text-3xl font-medium text-gray-500">
                            Свяжитесь с нами
                        </h1>
                        <p className="text-xl my-2">
                            Свяжитесь с нами. Мы дадим вам много информации. Мы предоставим
                            вам подробную информацию.
                        </p>
                        <input
                            type="text"
                            className="border-2 w-full rounded-lg p-2 mt-5"
                            placeholder="Email"
                        />
                        <br/>
                        <button className="border-2 mt-2 border-gray-400 rounded-md p-1">
                            Отправлять
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;
