import React, {useEffect, useRef, useState} from "react";
import {RiSendPlane2Line} from "react-icons/ri";
import {DatePicker} from "rsuite";
import ReactSelect from "react-select";
import regions from "../../../api/projectApi/regions";
import flights from "../../../api/projectApi/flights";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import hotelsTownLists from "../../../constants/hotelsTownLists";
import {useTranslation} from "react-i18next";
import AllStates from "../AllStates";
import BestStates from "../BestStates";
import LastSection from "../LastSection";
import htplace, {getHtplace} from "../../../constants/htplace";
import moment from "moment";
import * as _ from "lodash";
import {useSelector} from "react-redux";
import Sort from "../../../components/Sort";
import NavS from "../NavS";
import Star from "../../../static/images/star.svg";
import Tick from "../../../static/images/card_images/tick-circle.svg";

const RenderItem = ({e, adults = 0, children = 0, infant = 0, dates, priceChange = () => ({})}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const hotelId = e?.inc;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isReturn, setIsReturn] = useState({bool: true, arr: []});
    const [data] = useState({
        contactName: "",
        email: "",
        phone: "",
        comment: "",
        startDate: "2022-08-25T10:31:02.751Z",
        endDate: "2022-08-25T10:31:02.751Z",
        price: null,
        partnerId: currentUser?.id ? currentUser?.id : null,
        hotelId: e?.inc,
        regionId: e?.town,
        mealId: e?.mealstop ? e.mealstop : "0",
        roomId: "1",
        serviceId: "1",
        hotelPrice: 0,
        transferPrice: 100,
        flightId: e[0]?.id,
    });
    const [pr, setPr] = useState(0);

    const [values, setValues] = useState({
        loading: false,
        data: [],
        open: false,
        tabIndex: 1,
    });
    const htplace =
        Array.isArray(e.price) &&
        e.price?.map((e) => {
            return getHtplace(e.htplace);
        });
    useEffect(() => {
        let arr = [];
        Array.isArray(htplace) &&
        htplace?.map((r) => {
            try {
                if (+r?.pcount >= adults + children + infant) {
                    if (
                        +r?.adult >= adults &&
                        +r?.child >= children &&
                        +r?.infant >= infant
                    ) {
                        arr.push(r);
                    }
                }
            } catch (e) {
            }
        });
        if (arr.length > 0) {
            setIsReturn({bool: true, arr});
        } else {
            setIsReturn({bool: false, arr: []});
        }
    }, [adults, children, infant]);

    const handlePress = async () => {
        setValues({
            ...values,
            data: [],
            loading: false,
            open: !values.open,
        });
    };
    if (
        !(Array.isArray(e.price) && e.price.length > 0 && e.price[0]?.price > 0)
    ) {
        return null;
    }
    if (!isReturn.bool) {
        return null;
    }

    const filghtPrice = e.flights[0].price;
    var now = moment(dates.date2); //todays date
    var end = moment(dates.date1); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    const getPriceHotel = (hotelPrice) => {
        try {
            return (
                hotelPrice * Math.ceil(days) +
                (+adults + +children + +infant) * filghtPrice
            );
        } catch (e) {
            return 0;
        }
    };

    const getPrice = () => {
        try {
            const price = _.orderBy(e.price, [(e) => +e.price], ["asc"])
                    ?.map((e) => {
                        let bool = false;
                        try {
                            Array.isArray(isReturn.arr) &&
                            isReturn.arr?.map((r) => {
                                if (r.in === e.htplace) {
                                    bool = true;
                                }
                            });
                        } catch (e) {
                        }
                        if (bool) return e;
                    })
                    .filter((e) => !!e)[0].price *
                Math.ceil(days) +
                (+adults + +children + +infant) * filghtPrice
            priceChange(price)
            return price;
        } catch (e) {
            priceChange(0)
            return 0;
        }
    };

    return (
        <div className={"bg-white gap-5 shadow border rounded-lg py-6"}>
            <div
                onClick={handlePress}
                className="cursor-pointer flex gap-6"
                key={`${hotelId}`}
            >
                <div className={"max-w-[450px] overflow-auto relative"}>
                    <div className={"flex min-w-[450px] h-full"}>
                        <div
                            className={"min-w-[450px] rounded-xl overflow-hidden flex justify-center items-center h-full"}>
                            <img
                                src={"http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=" + e.inc + "&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64"}
                                className="h-[250px] rounded-xl w-[250px]" alt={`image${e.inc}`}/>
                        </div>
                        <div
                            className={"min-w-[450px] rounded-xl overflow-hidden flex justify-center items-center h-full"}>
                            <img
                                src={"http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=" + e.inc + "&id=1&equilateral=1&width=200&height=200&stamp=72BE0B64"}
                                className="h-[250px] rounded-xl w-[250px]" alt={`image${e.inc}`}/>
                        </div>
                        <div
                            className={"min-w-[450px] rounded-xl overflow-hidden flex justify-center items-center h-full"}>
                            <img
                                src={"http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=" + e.inc + "&id=2&equilateral=1&width=200&height=200&stamp=72BE0B64"}
                                className="h-[250px] rounded-xl w-[250px]" alt={`image${e.inc}`}/>
                        </div>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className={"flex gap-2 absolute bottom-3"}>
                            <div className={"w-4 h-4 bg-red-500 rounded-full"}></div>
                            <div className={"w-4 h-4 bg-gray-500 rounded-full"}></div>
                            <div className={"w-4 h-4 bg-gray-500 rounded-full"}></div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col gap-5 justify-between"}>
                    <div>
                        <div className="my-3 font-bold block">
                            <span className={"bg-red-500 rounded uppercase text-white p-1"}>турпакет</span>
                        </div>
                        <h1 className="text-xl font-bold block">{e.name}</h1>
                        <div className={"flex py-2"}>
                            {new Array(
                                isNaN(e.starCount?.slice(0, 1)) ? 1 : +e.starCount?.slice(0, 1)
                            )
                                .fill("a")
                                ?.map((a) => {
                                    return (
                                        <span className={"mx-1"}>
                      <img src={Star} alt="star"/>
                    </span>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"m-0 flex justify-start items-center gap-1"}>
                            <img src={Tick} alt=""/>
                            Авиаперелёт
                        </p>
                        <p className={"m-0 flex justify-start items-center gap-1"}>
                            <img src={Tick} alt=""/>
                            Виза
                        </p>
                        <p className={"m-0 flex justify-start items-center gap-1"}>
                            <img src={Tick} alt=""/>
                            Трансфер
                        </p>
                        <p className={"m-0 flex justify-start items-center gap-1"}>
                            <img src={Tick} alt=""/>
                            Страховка
                        </p>
                    </div>
                    <>
                        <div className={"rounded"}>
                            <div>
                                <form>
                                    <div>
                                        {values.loading ? (
                                            <div className={"flex justify-center"}>
                                                <div className="lds-dual-ring"></div>
                                            </div>
                                        ) : (
                                            <div className={"flex flex-col gap-3"}>
                                                {Array.isArray(e.price) &&
                                                    e.price.length > 0 &&
                                                    _.orderBy(e.price, [(e) => +e.price], ["asc"])?.map(
                                                        (e) => {
                                                            let bool = false;
                                                            try {
                                                                Array.isArray(isReturn.arr) &&
                                                                isReturn.arr?.map((r) => {
                                                                    if (r.in === e.htplace) {
                                                                        bool = true;
                                                                    }
                                                                });
                                                            } catch (e) {
                                                            }
                                                            if (!bool) return null;
                                                            return (
                                                                e.status !== "D" && (
                                                                    <div
                                                                        style={{width: "100%"}}
                                                                        className={
                                                                            "relative flex gap-2 items-center"
                                                                        }
                                                                    >
                                                                        <input
                                                                            name={"asd"}
                                                                            type="radio"
                                                                            onChange={() => setPr(e.price)}
                                                                            id={`${JSON.stringify(e)}`}
                                                                        />
                                                                        <label htmlFor={`${JSON.stringify(e)}`}>
                                                                            <div
                                                                                className={"flex flex-col justify-between h-full"}>
                                                                                <div>
                                                                                    <p className={"text-md p-0 m-0"}>{e.name ? e.name : "Standart"}</p>
                                                                                    <p className={"m-0"}>{e.dataa.name}</p>
                                                                                </div>
                                                                                {/*<div className={"text-right"}>*/}
                                                                                {/*  <button*/}
                                                                                {/*      className={*/}
                                                                                {/*        "px-4 py-2 bg-white text-zinc-900 font-bold capitalize rounded"*/}
                                                                                {/*      }*/}
                                                                                {/*      onClick={() =>*/}
                                                                                {/*          navigate(*/}
                                                                                {/*              `/hotel/order/${hotelId}/${e.inc}?name=${e.name}&adult=${adults}&c=${children}&d=${infant}`*/}
                                                                                {/*          )*/}
                                                                                {/*      }*/}
                                                                                {/*  >*/}
                                                                                {/*    {t("order")}*/}
                                                                                {/*  </button>*/}
                                                                                {/*</div>*/}
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                )
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                    <p className={"mt-auto text-2xl text-red-600 font-bold"}>
                        <span className={"text-xl text-black font-normal"}>Цена:</span> $
                        {pr === 0 ? Array.isArray(isReturn.arr) &&
                            isReturn.arr.length > 0 &&
                            Math.floor(getPrice()) + 180 : Math.floor(pr) * Math.ceil(days) + 180}<br/>

                    </p>
                    <button onClick={() => {
                        localStorage.setItem(
                            "tourPrice",
                            JSON.stringify({
                                ...data,
                                price: pr === 0 ? Array.isArray(isReturn.arr) &&
                                    isReturn.arr.length > 0 &&
                                    Math.floor(getPrice()) + 180 : Math.floor(pr) * Math.ceil(days) + 180,
                                roomId: e.inc,
                            })
                        );
                        navigate(
                            `/tourPack/order/${hotelId}/${e.inc}?name=${e.name}&adult=${adults}&c=${children}&d=${infant}`
                        );
                    }} className={"bg-red-500 text-white w-40 py-2 font-bold"}>Бронировать
                    </button>
                </div>
                {hotelsTownLists?.map((a) => {
                    return (
                        a.id === e.town && (
                            <p className="text-sm block bg-red-500">{a.title}</p>
                        )
                    );
                })}
            </div>
        </div>
    );
};

function TourPack() {
    const {t} = useTranslation();
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [regionsList, setRegionsList] = useState([]);
    const [flightsList, setFlightsList] = useState([]);
    const [isGroup, setIsGroup] = useState(1);
    const [hotels, setHotels] = useState([]);

    const [values, setValues] = useState({
        oldRegionId: null,
        oldFromId: null,
        oldToId: null,
        oldHotels: [],
        date1: null,
        date2: null,
    });
    const popupRef = useRef();

    const handleClick = (e) => {
        e.target.classList.contains("qw1") ? setIsOpen(true) : setIsOpen(false);
    };
    useEffect(() => {
        let arr = [];
        let all = [];
        regions.getAllRegions().then((regions) => {
            setRegionsList(
                regions.data.result.map((reg) => {
                    return {value: reg.id, regionId: reg.regionId, label: reg.name};
                })
            );
            regions.data.result.forEach((reg) => {
                flightsList.forEach((item) => {
                    if (item.fromId === reg.id) {
                        arr.push({...item, fromName: reg.name});
                    }
                });
            });
            regions.data.result.forEach((reg) => {
                arr.forEach((item) => {
                    if (item.toId === reg.id) {
                        all.push({...item, toName: reg.name});
                    }
                });
            });
        });
        setFlightsList(all);
    }, []);

    const handleSearch = () => {
        if (
            hotels.length > 0 &&
            to.regionId === values.oldRegionId &&
            from.id === values.oldFromId &&
            to.id === values.oldToId
        ) {
            return;
        } else {
            if (
                from?.value &&
                to?.value &&
                values.date1 !== null &&
                values.date2 &&
                values.date1 < values.date2
            ) {
                flights
                    .search(from.value, to.value, to.regionId)
                    .then((r) => {
                        if (Array.isArray(r.data) && r.data?.length > 0) {
                            setHotels(r.data);
                            setValues({
                                ...values,
                                oldRegionId: to.regionId,
                                oldHotels: r.data,
                                oldFromId: from.id,
                                oldToId: to.id,
                            });
                        } else {
                            setHotels([]);
                            toast("Турпакет не найден", {type: "info"});
                        }
                    })
                    .catch((e) => {
                        setHotels([]);
                        toast("Турпакет не найден", {type: "info"});
                    });
            } else {
                toast("Пожалуйста, заполните все поля или введите правильные даты", {
                    type: "info",
                });
            }
        }
    };

    return (
        <>
            <div className="second" onClick={handleClick} style={{backgroundSize: "100% 100%"}}>
                <NavS/>
                <div className="max-w-5xl pb-5 mx-auto">
                    <div className={"text-center mb-10 mt-36 text-white"}>
                        <h1 className={"text-5xl mb-4 font-bold"}>Куда бы вам хотелось отправиться?</h1>
                    </div>
                    <div className="bg-exam relative rounded-lg shadow-xl mb-36 text-white font-medium p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <input type="radio" name="t1" id="t1"/>
                                <label htmlFor="t1"></label>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center py-4 text-gray-600">
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("toT")}
                                </label>
                                <ReactSelect
                                    style={{border: "1px solid red"}}
                                    options={[
                                        {value: "", label: "- выбрать -"},
                                        ...regionsList,
                                    ]}
                                    placeholder="- выбрать -"
                                    value={from?.id}
                                    onChange={(newValue) => {
                                        setFrom(newValue);
                                    }}
                                />
                            </div>
                            <RiSendPlane2Line className="text-white w-10"/>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("fromTo")}
                                </label>
                                <ReactSelect
                                    options={[
                                        {value: "", label: "- выбрать -"},
                                        ...regionsList,
                                    ]}
                                    placeholder="- выбрать -"
                                    value={to?.id}
                                    onChange={(newValue) => {
                                        setTo(newValue);
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("to")}
                                </label>
                                <DatePicker
                                    disabledDate={(date) =>
                                        date.getDay() === 1 ||
                                        date.getDay() === 2 ||
                                        date.getDay() === 4 ||
                                        date.getDay() === 5 ||
                                        date.getDay() === 6
                                    }
                                    format="yyyy-MM-dd"
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        backgroundColor: "white",
                                    }}
                                    value={values.date1}
                                    onChange={(e) => setValues({...values, date1: e})}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("obratno")}
                                </label>
                                <DatePicker
                                    disabledDate={(date) =>
                                        date.getDay() === 0 ||
                                        date.getDay() === 1 ||
                                        date.getDay() === 4 ||
                                        date.getDay() === 5 ||
                                        date.getDay() === 3
                                    }
                                    format="yyyy-MM-dd"
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        backgroundColor: "white",
                                    }}
                                    value={values.date2}
                                    onChange={(e) => setValues({...values, date2: e})}
                                />
                            </div>
                            <div className="w-full relative">
                                <label htmlFor="date" className="block text-white text-sm">
                                    {t("gosti")}
                                </label>
                                <input
                                    autoComplete={"off"}
                                    value={
                                        "В:" +
                                        adults +
                                        " Д:" +
                                        children +
                                        " М:" +
                                        infant +
                                        ", Эконом"
                                    }
                                    onClick={() => setIsOpen(!isOpen)}
                                    onChange={() => console.log("as")}
                                    className="p-2 rounded qw1 w-full"
                                    type="text"
                                    name="from"
                                    placeholder="2, Эконом"
                                    id="from"
                                />
                                {isOpen ? (
                                    <div
                                        ref={popupRef}
                                        className="absolute qw1 top-full -left-20"
                                    >
                                        <div
                                            className="bg-white qw1 rounded-lg p-1 tooltip-in relative mt-5 w-80 shadow">
                                            <div className="flex qw1 p-3">
                                                <div className="qw1 w-full">
                                                    <p className={"qw1"}>
                                                        Взрослые <br/>
                                                        Старше 12 лет
                                                    </p>
                                                </div>
                                                <div className="qw1 flex qw1 w-full">
                                                    <button
                                                        onClick={() => setAdults((prev) => (prev -= 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={adults}
                                                        onInput={(e) => setAdults(+e.target.value)}
                                                        className="qw1 border-0 text-center p-2 w-1/2 outline-none bg-transparent"
                                                    />
                                                    <button
                                                        onClick={() => setAdults((prev) => (prev += 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="qw1 flex p-3">
                                                <div className="qw1 w-full">
                                                    <p className={"qw1"}>
                                                        Дети <br/>
                                                        От 2 до 12 лет
                                                    </p>
                                                </div>
                                                <div className="qw1 flex w-full">
                                                    <button
                                                        onClick={() => setChildren((prev) => (prev -= 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={children}
                                                        onInput={(e) =>
                                                            setChildren((prev) => +e.target.value)
                                                        }
                                                        className="qw1 text-center border-0 p-2 w-1/2 outline-none bg-transparent"
                                                    />
                                                    <button
                                                        onClick={() => setChildren((prev) => (prev += 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="qw1 flex p-3">
                                                <div className="qw1 w-full">
                                                    <p className={"qw1"}>
                                                        Младенцы <br/>
                                                        До 2 лет{" "}
                                                    </p>
                                                </div>
                                                <div className="qw1 flex w-full">
                                                    <button
                                                        onClick={() => setInfant((prev) => (prev -= 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={infant}
                                                        onInput={(e) =>
                                                            setInfant((prev) => +e.target.value)
                                                        }
                                                        className="qw1 text-center border-0 p-2 w-1/2 outline-none bg-transparent"
                                                    />
                                                    <button
                                                        onClick={() => setInfant((prev) => (prev += 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("transfers")}
                                </label>
                                <select
                                    name=""
                                    className="p-2 rounded w-full"
                                    id=""
                                    value={isGroup}
                                    onChange={(e) => setIsGroup(e.target.value)}
                                >
                                    <option value={1}>Групповой</option>
                                    <option value={0}>Индивидуальный</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleSearch}
                                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-600 text-white text-sm"
                            >
                                {t("nayti")}
                            </button>
                        </div>
                    </div>
                    <div className={"flex justify-center gap-4"}>
                        <div className={"border border-white w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                {/* {_.orderBy(hotels, [(e) => +e.sortField], ["asc"]).map((e) => { */}
                <Sort>
                    {hotels.map((e) => {
                        if (
                            !(
                                e.status !== "D" &&
                                e.name !== "" &&
                                e.name?.toLowerCase() !== "unknown hotel" &&
                                e.name !== undefined
                            )
                        ) {
                            return null;
                        }

                        let isReturn = {bool: true, arr: []}
                        const setIsReturn = (e) => isReturn = e
                        let now = moment(values?.date2); //todays date
                        let end = moment(values?.date1); // another date
                        let duration = moment.duration(now.diff(end));
                        let days = duration.asDays();
                        let arr = [];
                        Array.isArray(htplace) &&
                        htplace?.map((r) => {
                            try {
                                if (+r?.pcount >= adults + children + infant) {
                                    if (
                                        +r?.adult >= adults &&
                                        +r?.child >= children &&
                                        +r?.infant >= infant
                                    ) {
                                        arr.push(r);
                                    }
                                }
                            } catch (e) {
                            }
                        });
                        if (arr.length > 0) {
                            setIsReturn({bool: true, arr});
                        } else {
                            setIsReturn({bool: false, arr: []});
                        }
                        const price = _.orderBy(e.price, [(e) => +e.price], ["asc"])
                                ?.map((e) => {
                                    let bool = false;
                                    try {
                                        Array.isArray(isReturn.arr) &&
                                        isReturn.arr?.map((r) => {
                                            if (r.in === e.htplace) {
                                                bool = true;
                                            }
                                        });
                                    } catch (e) {
                                    }
                                    if (bool) return e;
                                })
                                .filter((e) => !!e)[0]?.price *
                            Math.ceil(days) +
                            (+adults + +children + +infant) * e.flights[0].price

                        return (
                            <RenderItem
                                e={e}
                                children={children}
                                infant={infant}
                                adults={adults}
                                isGroup={isGroup === 1}
                                dates={values}
                                price={price}
                            />
                        );
                    })}
                </Sort>
            </div>
            <BestStates/>
            <AllStates/>
            <LastSection/>
        </>
    );
}

export default TourPack;
