import React, { useEffect, useRef, useState } from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { DatePicker } from "rsuite";
import ReactSelect from "react-select";
import regions from "../../../api/projectApi/regions";
import flights from "../../../api/projectApi/flights";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import hotelsTownLists from "../../../constants/hotelsTownLists";
import { useTranslation } from "react-i18next";
import AllStates from "../AllStates";
import BestStates from "../BestStates";
import LastSection from "../LastSection";
import { getHtplace } from "../../../constants/htplace";
import { BiStar, BiTransfer } from "react-icons/bi";
import moment from "moment";
import { FaPlane } from "react-icons/fa";
import { SiVisa } from "react-icons/si";
import { FcDocument } from "react-icons/fc";
import * as _ from "lodash";
import { useSelector } from "react-redux";
import Sort from "../../../components/Sort";
import NavS from "../NavS";

const RenderItem = ({ e, adults = 0, children = 0, infant = 0, dates,priceChange=()=>({}) }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const hotelId = e?.inc;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isReturn, setIsReturn] = useState({ bool: true, arr: [] });
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
        } catch (e) {}
      });
    if (arr.length > 0) {
      setIsReturn({ bool: true, arr });
    } else {
      setIsReturn({ bool: false, arr: [] });
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
      const price =_.orderBy(e.price, [(e) => +e.price], ["asc"])
      ?.map((e) => {
        let bool = false;
        try {
          Array.isArray(isReturn.arr) &&
            isReturn.arr?.map((r) => {
              if (r.in === e.htplace) {
                bool = true;
              }
            });
        } catch (e) {}
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
    <div className={"bg-white p-2 gap-5 shadow border rounded-lg"}>
      <div
        onClick={handlePress}
        className="cursor-pointer flex gap-6"
        key={`${hotelId}`}
      >
        <img
          className="rounded"
          width="200"
          style={{ maxHeight: "200px" }}
          src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${hotelId}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
          alt=""
        />
        <div className={"flex flex-col justify-between"}>
          <div>
            <h1 className="text-2xl mb-3 font-bold block uppercase text-red-500">
              турпакет
            </h1>

            <h2 className="text-lg font-bold block">{e.name}</h2>
            <div className={"flex py-2"}>
              {new Array(
                isNaN(e.starCount?.slice(0, 1)) ? 1 : +e.starCount?.slice(0, 1)
              )
                .fill("a")
                ?.map((a) => {
                  return (
                    <span className={"mx-1"}>
                      <BiStar color={"red"} />
                    </span>
                  );
                })}
            </div>
          </div>
          <div className={"flex gap-2 items-center justify-start"}>
            <p className={"m-0 flex justify-center items-center gap-1"}>
              <FaPlane />
              Авиаперелёт
            </p>
            <p className={"m-0 flex justify-center items-center gap-1"}>
              <SiVisa />
              Виза
            </p>
            <p className={"m-0 flex justify-center items-center gap-1"}>
              <BiTransfer />
              Трансфер
            </p>
            <p className={"m-0 flex justify-center items-center gap-1"}>
              <FcDocument />
              Страховка
            </p>
          </div>
          <p className={"mt-auto text-2xl"}>
            Цена: $
            {Array.isArray(isReturn.arr) &&
              isReturn.arr.length > 0 &&
              Math.floor(getPrice() + 100)}
          </p>
        </div>
        {hotelsTownLists?.map((a) => {
          return (
            a.id === e.town && (
              <p className="text-sm block bg-red-500">{a.title}</p>
            )
          );
        })}
      </div>

      {values.open ? (
        <>
          <div className={"flex justify-between py-4"}>
            <div
              onClick={() => setValues({ ...values, tabIndex: 1 })}
              className={
                values.tabIndex === 1
                  ? "active:opacity-80 cursor-pointer flex justify-center bg-red-500 w-full text-center rounded-lg p-2 text-white capitalize text-lg font-bold"
                  : "flex cursor-pointer justify-center bg-gray-200 w-full text-center rounded-lg p-2 capitalize text-lg font-bold"
              }
            >
              Фото
            </div>
            <div
              onClick={() => setValues({ ...values, tabIndex: 0 })}
              className={
                values.tabIndex === 0
                  ? "active:opacity-80 cursor-pointer flex justify-center bg-red-500 w-full text-center rounded-lg p-2 text-white capitalize text-lg font-bold"
                  : "flex cursor-pointer justify-center bg-gray-200 w-full text-center rounded-lg p-2 capitalize text-lg font-bold"
              }
            >
              Комната
            </div>
          </div>
          <div className={"bg-gray-200 rounded p-5"}>
            {values.tabIndex === 0 ? (
              <div className={"mt-16"}>
                <form action="">
                  <div>
                    {values.loading ? (
                      <div className={"flex justify-center"}>
                        <div className="lds-dual-ring"></div>
                      </div>
                    ) : (
                      <div className={"grid lg:grid-cols-2 grid-cols-1 gap-5"}>
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
                              } catch (e) {}
                              if (!bool) return null;
                              return (
                                e.status !== "D" && (
                                  <div
                                    style={{ width: "100%", minHeight: 200 }}
                                    className={
                                      "bg-red-400 text-white relative p-3 rounded-lg shadow"
                                    }
                                  >
                                    <input
                                      name={"asd"}
                                      className={
                                        "absolute hidden h-full w-full top-0 left-0"
                                      }
                                      type="radio"
                                    />
                                    <div
                                      className={
                                        "flex flex-col justify-between h-full"
                                      }
                                    >
                                      <div>
                                        <h3>{e.name ? e.name : "Standart"}</h3>
                                        <p className={"text-xl"}>
                                          Цена: $
                                          {Math.floor(
                                            getPriceHotel(e.price) + 100
                                          )}
                                        </p>
                                        <p>{e.dataa.name}</p>
                                      </div>
                                      <div className={"text-right"}>
                                        <button
                                          className={
                                            "px-4 py-2 bg-white text-zinc-900 font-bold capitalize rounded"
                                          }
                                          onClick={() => {
                                            localStorage.setItem(
                                              "tourPrice",
                                              JSON.stringify({
                                                ...data,
                                                price: Math.floor(
                                                  getPriceHotel(e.price) + 100
                                                ),
                                                roomId: e.inc,
                                              })
                                            );
                                            navigate(
                                              `/tourPack/order/${hotelId}/${e.inc}?name=${e.name}&adult=${adults}&c=${children}&d=${infant}`
                                            );
                                          }}
                                        >
                                          {t("order")}
                                        </button>
                                      </div>
                                    </div>
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
            ) : (
              <div className={"flex gap-4"}>
                <img
                  className="rounded hover:shadow-md transition hover:shadow-red-300"
                  width="150px"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                  src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                  alt=""
                />
                <img
                  className="rounded hover:shadow-md transition hover:shadow-red-300"
                  width="150px"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                  src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=1&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                  alt=""
                />
                <img
                  className="rounded hover:shadow-md transition hover:shadow-red-300"
                  width="150px"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                  src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${e.inc}&id=2&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                  alt=""
                />
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

function TourPack() {
  const { t } = useTranslation();
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
          return { value: reg.id, regionId: reg.regionId, label: reg.name };
        })
      );
      regions.data.result.forEach((reg) => {
        flightsList.forEach((item) => {
          if (item.fromId === reg.id) {
            arr.push({ ...item, fromName: reg.name });
          }
        });
      });
      regions.data.result.forEach((reg) => {
        arr.forEach((item) => {
          if (item.toId === reg.id) {
            all.push({ ...item, toName: reg.name });
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
              toast("Турпакет не найден", { type: "info" });
            }
          })
          .catch((e) => {
            setHotels([]);
            toast("Турпакет не найден", { type: "info" });
          });
      } else {
        toast("Пожалуйста, заполните все поля или введите правильные даты", {
          type: "info",
        });
      }
    }
  };
  
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <>
      <div className="second" onClick={handleClick} style={{backgroundSize: "100% 100%"}}>
        <NavS />
        <div className="max-w-5xl pb-5 mx-auto">
          <div className={"text-center mb-10 mt-36 text-white"}>
            <h1 className={"text-5xl mb-4 font-bold"}>Куда бы вам хотелось отправиться?</h1>
            <p className={"px-10"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat auctor nulla ut magna penatibus. Urna nunc et purus praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat auctor nulla ut magna penatibus. Urna nunc et purus praesent.
            </p>
          </div>
          <div className="bg-exam relative rounded-lg shadow-xl mb-36 text-white font-medium p-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <input type="radio" name="t1" id="t1" />
                <label htmlFor="t1"></label>
              </div>
            </div>
            <div className="flex gap-2 items-center py-4 text-gray-600">
              <div className="w-full">
                <label htmlFor="from" className="block text-white text-sm">
                  {t("toT")}
                </label>
                <ReactSelect
                    style={{ border: "1px solid red" }}
                    options={[
                      { value: "", label: "- выбрать -" },
                      ...regionsList,
                    ]}
                    placeholder="- выбрать -"
                    value={from?.id}
                    onChange={(newValue) => {
                      setFrom(newValue);
                    }}
                />
              </div>
              <RiSendPlane2Line className="text-white w-10" />
              <div className="w-full">
                <label htmlFor="from" className="block text-white text-sm">
                  {t("fromTo")}
                </label>
                <ReactSelect
                    options={[
                      { value: "", label: "- выбрать -" },
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
                    onChange={(e) => setValues({ ...values, date1: e })}
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
                    onChange={(e) => setValues({ ...values, date2: e })}
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
                      <div className="bg-white qw1 rounded-lg p-1 tooltip-in relative mt-5 w-80 shadow">
                        <div className="flex qw1 p-3">
                          <div className="qw1 w-full">
                            <p className={"qw1"}>
                              Взрослые <br />
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
                              Дети <br />
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
                              Младенцы <br />
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
          const priceChange = (price)=>{
            // forceUpdate()
            e.sortField = price
          }
          return (
            <RenderItem
              e={e}
              children={children}
              infant={infant}
              adults={adults}
              isGroup={isGroup === 1}
              dates={values}
              priceChange={priceChange}
            />
          );
        })}
        </Sort>
      </div>
      <BestStates />
      <AllStates />
      <LastSection />
    </>
  );
}

export default TourPack;
