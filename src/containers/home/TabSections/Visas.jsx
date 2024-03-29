import React, {useRef, useState} from "react";
import {RiSendPlane2Line} from "react-icons/ri";
import {
    VISAS,
    VISA_STATE,
    VISA_PRICE,
    VISA_PRICE2,
} from "../../../constants/visas";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import NavS from "../NavS";
import Contacts from "../../../components/contacts";
import {useSelector} from "react-redux";
import {getAdminPrice, getAgentPrice, getUserPrice} from "../../../utils/prices";

function VisasTab() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [adults, setAdults] = useState(1);
    const user = useSelector((state) => state.user.currentUser);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [visaType, setVisaType] = useState(0);
    const [location, setLocation] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState("");
    const [visas, setVisas] = useState([]);
    const [visaTypes, setVisaTypes] = useState(0);
    const popupRef = useRef();

    const visaFunc = (e) => {
        e.preventDefault();
        let price = 100;
        let countPassegers = +adults + +children;
        // eslint-disable-next-line no-mixed-operators,no-unused-vars
        let pr1 = 0;
        // eslint-disable-next-line no-unused-vars
        let pr2 = 0;
        // eslint-disable-next-line array-callback-return
        VISA_PRICE2.map((a) => {
            if (+a.id === +visaType) {
                pr1 = a.price.adults;
                pr2 = a.price.children;
            }
        });
        price =
            visaTypes === 0
                ? user.role === "admin" ? getAdminPrice(VISA_PRICE[visaType] * countPassegers) : user.role === "agent" ? getAgentPrice(VISA_PRICE[visaType] * countPassegers) : getUserPrice(VISA_PRICE[visaType] * countPassegers)
                : user.role === "admin" ? getAdminPrice(+adults * +pr1 + +children * +pr2) : user.role === "agent" ? getAgentPrice(+adults * +pr1 + +children * +pr2) : getUserPrice(+adults * +pr1 + +children * +pr2);

        setVisas([
            ...visas,
            {
                visaType: visaType,
                location: location,
                date: date,
                countPassegers: countPassegers,
                passengers: [],
                price: price,
                phone: "",
                name: "",
            },
        ]);
    };

    const handleClick = (e) => {
        e.target.classList.contains("qw1") ? setIsOpen(true) : setIsOpen(false);
    };

    const order = (obj) => {
        obj = {...obj, price: user.role === "admin" ? getAdminPrice(obj.price) : user.role === "agent" ? getAgentPrice(obj.price) : getUserPrice(obj.price)}
        let tr_data = JSON.stringify(obj);
        localStorage.setItem("visa", tr_data);
        navigate(`/visaDetails/${adults + "_" + children + "_" + infant}`);
    };

    return (
        <>
            <div className={"fifth pb-1"} style={{backgroundSize: "100% 100% !important"}} onClick={handleClick}>
                <NavS/>
                <div className="max-w-5xl pb-5 mx-auto">
                    <div className={"text-center mb-10 mt-36 text-white"}>
                        <h1 className={"text-7xl mb-4 font-bold"}>Визы</h1>
                    </div>
                    <div className="bg-exam relative rounded-lg shadow-xl mb-36 text-white font-medium p-5">
                        <div className="flex gap-2 lg:flex-row flex-col items-center py-4 text-gray-600">
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("strana")}
                                </label>
                                <select
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                        +e.target.value === 0 ? setVisaTypes(0) : setVisaTypes(1);
                                    }}
                                    className="p-2 rounded w-full"
                                    name="state_from"
                                    id="state_from"
                                    placeholder={"- выбрат -"}
                                >
                                    {VISA_STATE.map((visa, index) => (
                                        <option key={visa} value={index}>
                                            {visa}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <RiSendPlane2Line className="text-white w-10"/>
                            <div className="w-full">
                                <label htmlFor="from" className="block text-white text-sm">
                                    {t("typeVisa")}
                                </label>
                                <select
                                    onChange={(e) => setVisaType(e.target.value)}
                                    className="p-2 rounded w-full"
                                    name="state_from"
                                    placeholder={"- выбрат -"}
                                    id="state_from"
                                >
                                    <option>-выбрать-</option>
                                    {visaTypes === 0
                                        ? VISAS.map((visa, index) => {
                                            if (index <= 2) {
                                                return (
                                                    <option key={visa} value={index}>
                                                        {visa}
                                                    </option>
                                                );
                                            }
                                        })
                                        : VISA_PRICE2.map((visa, index) => (
                                            <option key={index} value={visa.id}>
                                                {visa.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="date" className="block text-white text-sm">
                                    {t("date")}
                                </label>
                                <div className="control-pane">
                                    <div className="control-section">
                                        <div className="daterangepicker-control-section">
                                            <input
                                                required
                                                type="date"
                                                className="p-2 rounded w-full"
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
                                    // onChange={() => console.log('as')}
                                    className="p-2 rounded qw1 w-full"
                                    type="text"
                                    name="from"
                                    placeholder="2, Эконом"
                                    id="sa"
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
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={visaFunc}
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
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                        <div className={"border border-white w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white rounded-full"}></div>
                        </div>
                        <div className={"w-6 h-6 flex justify-center items-center rounded-full"}>
                            <div className={"w-3 h-3 bg-white/70 rounded-full"}></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={"max-w-5xl mx-auto py-3 mt-10"}>
                {visas.map((tr) => {
                    return (
                        <div
                            className={
                                "shadow bg-white rounded mb-3 border-red-400 p-3 border flex items-center justify-between px-10"
                            }
                        >
                            <div>
                                <p className={"text-lg"}>
                                    <span className={"font-bold"}>Виза:</span>{" "}
                                    {VISA_STATE[tr.location]}
                                </p>
                            </div>
                            <div>
                                <p className={"text-lg"}>
                                    <span className={"font-bold"}>Passengers:</span>{" "}
                                    {tr.countPassegers}
                                </p>
                            </div>
                            <div className={"text-center"}>
                                <p className={"text-xl"}>
                                    <span className={"font-bold"}>Price:</span> {user.role === "agent"
                                    ? getAgentPrice(tr.price) : user.role === "admin"
                                        ? getAdminPrice(tr.price) : getUserPrice(tr.price)}$
                                </p>
                                <button
                                    onClick={() => order(tr)}
                                    className={
                                        "p-3 active:opacity-90 px-5 border-red-500 border rounded hover:bg-red-500 hover:text-white transition"
                                    }
                                >
                                    Заказать
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Contacts/>
        </>
    );
}

export default VisasTab;
