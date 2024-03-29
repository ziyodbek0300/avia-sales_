import React, {useEffect, useRef, useState} from "react";
import {RiSendPlane2Line} from "react-icons/ri";
import hotel from "../../../api/projectApi/hotel";
import hotelsTownLists from "../../../constants/hotelsTownLists";
// import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import htplace, {getHtplace} from "../../../constants/htplace";
import moment from "moment";
import * as _ from "lodash";
import Sort from "../../../components/Sort";
import NavS from "../NavS";
import Contacts from "../../../components/contacts";
import Star from "../../../static/images/star.svg";
import {useNavigate} from "react-router-dom";
import GetMealName from "../../../constants/meals";

const RenderItem = ({
                        e,
                        adults = 0,
                        children = 0,
                        infant = 0,
                        townId = 1,
                        dates,
                        foodId,
                        roomId = 2,
                        priceChange = () => ({}),
                    }) => {
    // const navigate = useNavigate();
    // const {t} = useTranslation();


    const hotelId = e?.inc;
    const navigate = useNavigate();
    const [isReturn, setIsReturn] = useState({bool: true, arr: []});
    const [values, setValues] = useState({
        loading: false,
        data: [],
        open: false,
        tabIndex: 1,
    });
    const [pr, setPr] = useState(0);

    const htplace =
        Array.isArray(e?.price) &&
        e?.price?.map((e) => {
            return getHtplace(e?.htplace);
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

    let now = moment(dates?.date2); //today's date
    let end = moment(dates?.date1); // another date
    let duration = moment.duration(now.diff(end));
    let days = duration.asDays();

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

    const getPrice = () => {
        try {
            const price =
                _.orderBy(e.price, [(e) => +e.price], ["asc"])
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
                    .filter((e) => !!e)[0].price * Math.ceil(days);
            priceChange(price);
            return price;
        } catch (e) {
            priceChange(0);
            return 0;
        }
    };


    return (
        <div className={"bg-white p-2 gap-5 shadow border rounded-lg"}>
            <div
                onClick={handlePress}
                className="cursor-pointer flex gap-6"
                key={`${hotelId}`}
            >
                <div className={"max-w-[300px] overflow-auto relative"}>
                    <div className={"flex min-w-[300px]"}>
                        <div
                            className={"min-w-[300px] min-h-[300px] flex justify-center items-center rounded-xl overflow-hidden"}>
                            <img
                                src={`https://travelcontinent.uz/image/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                className="w-[250px] h-[250px] rounded-xl" alt={"example 2"}/>
                        </div>
                        <div
                            className={"min-w-[300px] min-h-[300px] flex justify-center items-center rounded-xl overflow-hidden"}>
                            <img
                                src={`https://travelcontinent.uz/image/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=1&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                className="w-[250px] h-[250px] rounded-xl" alt={"example 2"}/>
                        </div>
                        <div
                            className={"min-w-[300px] min-h-[300px] flex justify-center items-center rounded-xl overflow-hidden"}>
                            <img
                                src={`https://travelcontinent.uz/image/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=2&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                                className="w-[250px] h-[250px] rounded-xl" alt={"example 2"}/>
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
                <div className={"flex flex-col gap-7 justify-between"}>
                    <div>
                        <h1 className="text-xl font-bold block">{e.name}</h1>
                        <div className={"flex py-2"}>
                            {new Array(
                                isNaN(e.starCount?.slice(0, 1)) ? 1 : +e.starCount?.slice(0, 1)
                            )
                                .fill("a")
                                ?.map(() => {
                                    return (
                                        <span className={"mx-1"}>
                                          <img src={Star} alt="star"/>
                                        </span>
                                    );
                                })}
                        </div>
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
                                                            // if (!bool) return null;
                                                            return (
                                                                // e.status !== "D" && (
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
                                                                                <p className={"text-md p-0 m-0"}>{e.name ? e.name : "Standart"}
                                                                                    <span
                                                                                        className={foodId === GetMealName(e) ? "text-white ml-1 bg-blue-700" : "text-red-500 ml-1"}>({GetMealName(e)})</span>
                                                                                </p>
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
                                                                // )
                                                            )
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
                            Math.floor(getPrice()) : Math.floor(pr) * Math.ceil(days)}<br/>

                    </p>
                    <button onClick={() => {
                        localStorage.setItem(
                            "tourPrice",
                            JSON.stringify({
                                ...dates,
                                town: townId,
                                ...values,
                                price: pr === 0 ? Array.isArray(isReturn.arr) &&
                                    isReturn.arr.length > 0 &&
                                    Math.floor(getPrice()) + 180 : Math.floor(pr) * Math.ceil(days) + 180,
                                roomId: roomId,
                            })
                        );
                        navigate(
                            `/hotel/order/${hotelId}/${e.inc}?name=${e.name}&adult=${adults}&c=${children}&d=${infant}`
                        )
                    }}
                            className={"bg-red-500 hover:opacity-90 active:opacity-80 transition-all w-40 py-2 text-white rounded"}>Бронироват
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

function Hotels() {
    const {t} = useTranslation();
    const [hotels, setHotels] = useState([]);
    const [values, setValues] = useState({
        town: hotelsTownLists[0].id,
        datebeg: null,
        dateend: null,
    });
    const [search, setSearch] = useState("");
    const [adults, setAdults] = useState(1);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef();

    const handlePressFind = () => {
        hotel
            .getHotels(values.town)
            .then((r) => {
                console.log("response", r);
                setHotels(Array.isArray(r.data) ? r.data : []);
            })
            .catch(() => {
                // setHotels([])
            });
    };


    const townRef = useRef();

    const handleClick = (e) => {
        e.target.classList.contains("qw1") ? setIsOpen(true) : setIsOpen(false);
    };

    const [dates, setDates] = useState({
        date1: null,
        date2: null,
    });
    const [foods, setFoods] = useState("");

    return (
        <>
            <div className={"fourth pb-1"} style={{backgroundSize: "100% 100% !important"}} onClick={handleClick}>
                <NavS/>
                <div className="max-w-5xl pb-5 mx-auto">
                    <div className={"text-center mb-10 mt-36 text-white"}>
                        <h1 className={"text-7xl mb-4 font-bold"}>Отели</h1>
                    </div>
                    <div className="bg-exam relative rounded-lg shadow-xl mb-36 text-white font-medium p-5">
                        <div className="flex gap-2 items-center py-4 text-gray-600">
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("fromTo")}
                                </label>
                                <select
                                    ref={townRef}
                                    className="p-2 rounded w-full"
                                    // type="text"
                                    name="from"
                                    placeholder="- выбрать -"
                                    id="from"
                                    onChange={(e) => {
                                        setValues({...values, town: e.target.value});
                                    }}
                                >
                                    <option value="">- выбрать -</option>
                                    {hotelsTownLists.map((e) => {
                                        return (
                                            <option key={e.id} value={e.id}>
                                                {e.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <RiSendPlane2Line className="text-white w-10"/>
                            <div className="w-full">
                                <label htmlFor="date" className="block text-white text-sm">
                                    {t("departure")}
                                </label>
                                <input
                                    type="date"
                                    className="p-2 rounded w-full"
                                    name="date"
                                    id="date"
                                    value={dates.date1}
                                    onChange={(e) =>
                                        setDates({
                                            ...dates,
                                            date1: moment(e.target.value).format("yyyy-MM-DD"),
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="date" className="block text-white text-sm">
                                    {t("endDate")}
                                </label>
                                <input
                                    type="date"
                                    className="p-2 rounded w-full"
                                    name="date"
                                    id="date"
                                    value={dates.date2}
                                    onChange={(e) =>
                                        setDates({
                                            ...dates,
                                            date2: moment(e.target.value).format("yyyy-MM-DD"),
                                        })
                                    }
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
                                                        onClick={() => setAdults((prev) => (prev - 1))}
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
                                                        onClick={() => setAdults((prev) => (prev + 1))}
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
                                                        onClick={() => setChildren((prev) => (prev - 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={children}
                                                        onInput={(e) =>
                                                            setChildren(() => +e.target.value)
                                                        }
                                                        className="qw1 text-center border-0 p-2 w-1/2 outline-none bg-transparent"
                                                    />
                                                    <button
                                                        onClick={() => setChildren((prev) => (prev + 1))}
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
                                                        onClick={() => setInfant((prev) => (prev - 1))}
                                                        className="qw1 w-1/2 border-2 border-red-500 active:bg-red-500 active:text-white text-xl transition-all px-2 rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={infant}
                                                        onInput={(e) =>
                                                            setInfant(() => +e.target.value)
                                                        }
                                                        className="qw1 text-center border-0 p-2 w-1/2 outline-none bg-transparent"
                                                    />
                                                    <button
                                                        onClick={() => setInfant((prev) => (prev + 1))}
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
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handlePressFind}
                                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-500 text-white text-sm"
                            >
                                {t("nayti")}
                            </button>
                        </div>
                    </div>
                    <div className={"flex justify-center gap-4"}>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"border border-white w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white rounded-full"}></div>
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
                {hotels?.length !== 0 ? (
                    <div className={"flex justify-start items-end gap-4 bg-white shadow-md mt-5 border p-4 rounded"}>
                        <div>
                            <h2 className={"text-2xl mb-3"}>Доступные отели</h2>
                            <input
                                placeholder={"Search"}
                                className={"border outline-red-500 p-2 w-64 rounded"}
                                type={"search"}
                                onInput={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select name="sortByMeal" onChange={(e) => {
                            setFoods(e.target.value);
                        }} className={"h-9 p-2 px-5 border outline-red-500 rounded"} id="sortByMeal">
                            <option value="">Любое</option>
                            <option value="AI - Dine Around">AI - Dine Around</option>
                            <option value="AI - Gold">AI - Gold</option>
                            <option value="AI - Plus">AI - Plus</option>
                            <option value="AI - Premium Mirage">AI - Premium Mirage</option>
                            <option value="AI - Ultra Soft">AI - Ultra Soft</option>
                            <option value="BB">BB</option>
                            <option value="FB - Deluxe">FB - Deluxe</option>
                            <option value="FB - Dine Around">FB - Dine Around</option>
                            <option value="FB - Plus">FB - Plus</option>
                            <option value="FB - Premium">FB - Premium</option>
                            <option value="FB - Premium Dine Around">FB - Premium Dine Around</option>
                            <option value="FB">FB</option>
                            <option value="HB - Deluxe">HB - Deluxe</option>
                            <option value="HB - Dine Around">HB - Dine Around</option>
                            <option value="HB - Dinner">HB - Dinner</option>
                            <option value="HB - Lunch">HB - Lunch</option>
                            <option value="HB - Plus">HB - Plus</option>
                            <option value="HB - Premium">HB - Premium</option>
                            <option value="HB - Premium Dine Around">HB - Premium Dine Around</option>
                            <option value="HB">HB</option>
                            <option value="HB Plus - Dinner">HB Plus - Dinner</option>
                            <option value="RO">RO</option>
                        </select>
                    </div>
                ) : (
                    ""
                )}
                {hotels.length > 0 && (
                    <Sort hotels={hotels} setSearch={setSearch}>
                        {hotels.map((e) => {
                            let isReturn = {bool: true, arr: []}
                            const setIsReturn = (e) => isReturn = e
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
                            let now = moment(dates?.date2); //today's date
                            let end = moment(dates?.date1); // another date
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
                            const price =
                                _.orderBy(e.price, [(e) => +e.price], ["asc"])
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
                                    .filter((e) => !!e)[0]?.price * Math.ceil(days);
                            try {
                                return e.name.toLowerCase().includes(search.toLowerCase()) && (
                                    <RenderItem
                                        foodId={foods}
                                        e={e}
                                        adults={adults}
                                        infant={infant}
                                        children={children}
                                        dates={dates}
                                        townId={values.town}
                                        price={price}
                                        roomId={e.inc}
                                    />
                                );
                            } catch (e) {
                            }
                        })}
                    </Sort>
                )}
            </div>
            <Contacts/>
        </>
    );
}

export default Hotels;
