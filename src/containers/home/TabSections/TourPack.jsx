import React, { useEffect, useRef, useState } from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";
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
import { BiStar } from "react-icons/bi";

const RenderItem = ({ e, adults = 0, children = 0, infant = 0 }) => {
  const navigate = useNavigate();
  const hotelId = e?.inc;
  const [isReturn, setIsReturn] = useState({ bool: true, arr: [] });
  const [values, setValues] = useState({
    loading: false,
    data: [],
    open: false,
    tabIndex: 1,
  });
  const htplace = e.price.map((e) => {
    return getHtplace(e.htplace);
  });
  useEffect(() => {
    let arr = [];
    htplace.map((r) => {
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
  if (!(Array.isArray(e.price) && e.price.length > 0 && e.price[0].price > 0)) {
    return null;
  }
  if (!isReturn.bool) {
    return null;
  }

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
            <div className={"flex py-5"}>
              {new Array(
                isNaN(e.starCount.slice(0, 1)) ? 1 : +e.starCount.slice(0, 1)
              )
                .fill("a")
                .map((a) => {
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
            {Array.isArray(e.price) &&
              e.price.length > 0 &&
              Math.floor(e.price[0].price)}
          </p>
        </div>
        {hotelsTownLists.map((a) => {
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
                          e.price?.map((e) => {
                            let bool = false;
                            try {
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
                                        Price: ${Math.floor(e.price)}
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
                                            `hotel/order/${hotelId}/${e.inc}?name=${e.name}&adult=${adults}&c=${children}&d=${infant}`
                                          )
                                        }
                                      >
                                        order
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            );
                          })}
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

  return (
    <>
      <div className="header second" onClick={handleClick}>
        <div className="max-w-5xl mx-auto py-52">
          <div className="bg-blue-900 border-4 border-red-600 rounded-lg shadow-xl text-white font-medium p-5">
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
                    border: "4px solid rgb(220 38 38)",
                    borderRadius: "4px",
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
                    border: "4px solid rgb(220 38 38)",
                    borderRadius: "4px",
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
                    " М:" +
                    infant +
                    " Д:" +
                    children +
                    ", Эконом"
                  }
                  onClick={() => setIsOpen(!isOpen)}
                  onChange={() => console.log("as")}
                  className="p-2 rounded border-4 qw1 border-red-600 w-full"
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
                  className="p-2 rounded border-4 border-red-600 w-full"
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
                className="cursor-pointer outline-none px-4 py-2 font-bold flex gap-2 items-center rounded-lg bg-red-800 text-white text-sm"
              >
                {t("nayti")} <BsArrowRightShort className="lh-0 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto flex flex-col gap-3">
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
          return (
            <RenderItem
              e={e}
              children={children}
              infant={infant}
              adults={adults}
              isGroup={isGroup === 1}
            />
          );
        })}
      </div>
      <BestStates />
      <AllStates />
      <LastSection />
    </>
  );
}

export default TourPack;
