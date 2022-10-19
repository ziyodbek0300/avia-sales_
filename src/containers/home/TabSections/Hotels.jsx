import React, { useEffect, useRef, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { RiSendPlane2Line } from "react-icons/ri";
import hotel from "../../../api/projectApi/hotel";
import hotelsTownLists from "../../../constants/hotelsTownLists";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getHtplace } from "../../../constants/htplace";
import moment from "moment";
import { BiStar } from "react-icons/bi";
import * as _ from "lodash";
import Sort from "../../../components/Sort";
import NavS from "../NavS";
import Contacts from "../../../components/contacts";

const RenderItem = ({
  e,
  adults = 0,
  children = 0,
  infant = 0,
  dates,
  priceChange = () => ({}),
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const hotelId = e?.inc;
  const [isReturn, setIsReturn] = useState({ bool: true, arr: [] });
  const [values, setValues] = useState({
    loading: false,
    data: [],
    open: false,
    tabIndex: 1,
  });

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
        } catch (e) {}
      });
    if (arr.length > 0) {
      setIsReturn({ bool: true, arr });
    } else {
      setIsReturn({ bool: false, arr: [] });
    }
  }, [adults, children, infant]);
  
  var now = moment(dates?.date2); //todays date
  var end = moment(dates?.date1); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();

  const getPriceHotel = (hotelPrice) => {
    try {
      return hotelPrice * Math.ceil(days);
    } catch (e) {
      return 0;
    }
  };

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
            } catch (e) {}
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
        <img
          className="rounded"
          width="200"
          style={{ maxHeight: "200px" }}
          src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${hotelId}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
          alt=""
        />
        <div className={"flex flex-col justify-between"}>
          <div>
            <h1 className="text-xl font-bold block">{e.name}</h1>
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
          <p className={"mt-auto text-2xl"}>
            Цена: $
            {Array.isArray(isReturn.arr) &&
              isReturn.arr.length > 0 &&
              Math.floor(getPrice())}
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
                                          Price: $
                                          {Math.floor(getPriceHotel(e.price))}
                                        </p>
                                        <p>{e.dataa.name}</p>
                                      </div>
                                      <div className={"text-right"}>
                                        <button
                                          className={
                                            "px-4 py-2 bg-white text-zinc-900 font-bold capitalize rounded"
                                          }
                                          onClick={() =>
                                            navigate(
                                              `/hotel/order/${hotelId}/${e.inc}?name=${e.name}&adult=${adults}&c=${children}&d=${infant}`
                                            )
                                          }
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

function Hotels() {
  const { t } = useTranslation();
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
  const [sortPrice, setSortPrice] = useState(0)
  const popupRef = useRef();

  const handlePressFind = () => {
    hotel
      .getHotels(values.town)
      .then((r) => {
        console.log("response",r);
        const response = r.data;

        setHotels(Array.isArray(r.data) ? r.data : []);
      })
      .catch((e) => {
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

  return (
    <>
      <div className={"fourth pb-1"} style={{backgroundSize: "100% 100% !important"}} onClick={handleClick}>
        <NavS/>
          <div className="max-w-5xl pb-5 mx-auto">
            <div className={"text-center mb-10 mt-36 text-white"}>
              <h1 className={"text-7xl mb-4 font-bold"}>Отели</h1>
              <p className={"px-10"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat auctor nulla ut magna penatibus. Urna nunc et purus praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat auctor nulla ut magna penatibus. Urna nunc et purus praesent.
              </p>
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
                        setValues({ ...values, town: e.target.value });
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
                <RiSendPlane2Line className="text-white w-10" />
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
          <div className={"flex justify-end"}>
            <input
              placeholder={"Search"}
              className={"border border-red-500 p-2 rounded"}
              type={"search"}
              onInput={(e) => setSearch(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        {hotels.length > 0 && (
          <Sort hotels={hotels} setSearch={setSearch}>
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
              const priceChange = (price) => {
                // forceUpdate()
                e.sortField = price;
            
              };
              try {
                return e.name.toLowerCase().includes(search.toLowerCase()) && (
                  <RenderItem
                    e={e}
                    adults={adults}
                    infant={infant}
                    children={children}
                    dates={dates}
                    priceChange={priceChange}
                  />
                );
              } catch (e) {}
            })}
        </Sort>
        )}
        
      </div>
      <Contacts/>
    </>
  );
}

export default Hotels;
