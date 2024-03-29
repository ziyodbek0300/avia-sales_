import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import FormExample from "../details/FormExample";
import {v4} from "uuid";
import moment from "moment";
import {useSelector} from "react-redux";
import order from "../../api/projectApi/order";
import {toast} from "react-toastify";
import tourOrder from "../../api/projectApi/tourOrder";
import hotel from "../../api/projectApi/hotel";

function useQuery() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const HotelsOrder = () => {
    // const params = useParams()
    // console.log(params)
    const {id} = useParams();
    const query = useQuery();
    const [adults, setAdults] = useState(query.get("adult") || 0);
    const [children, setChildren] = useState(query.get("c") || 0);
    const [infants, setInfants] = useState(query.get("d") || 0);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [comment, setComment] = useState("");
    const navigate = useNavigate()
    const [passagers, setPassagers] = useState(
        new Array(+adults + +children + +infants).fill({
            first_name: "",
            last_name: "",
            from: "",
            gender: "",
            birthday: "",
            sNum: "",
            date3: "",
            filesLink: ""
        }));
    const currentUser = useSelector((state) => state.user.currentUser);

    const onchange = (data) => {
        setPassagers(data);
    };


    const saveOrder = () => {
        let pass = [];
        // eslint-disable-next-line array-callback-return
        passagers.map((p) => {
            pass.push({
                lastname: p.last_name,
                filesLink: p.filesLink,
                firtname: p.first_name,
                nationality: p.from,
                gender: p.gender,
                birthday: moment(p.birthday).toDate(),
                passportNumber: p.sNum,
                endDate: moment(p.date3).toDate(),
            });
        });

        let obj = {
            comment: "Some comment",
            startDate: new Date(JSON.parse(localStorage.getItem("tourPrice")).date1),
            endDate: new Date(JSON.parse(localStorage.getItem("tourPrice")).date2),
            price: JSON.parse(localStorage.getItem("tourPrice")).price,
            partnerId: currentUser.id,
            hotelId: "1",
            regionId: JSON.parse(localStorage.getItem("tourPrice")).town,
            mealId: "112",
            roomId: JSON.parse(localStorage.getItem("tourPrice")).roomId,
            serviceId: "1",
            contactName: contactName,
            email: contactEmail,
            phone: contactPhone,
            passagers: pass,
        };

        hotel
            .hotelOrder(obj)
            .then((response) => {
                toast("Забронирован");
                navigate(`/details/hotelResult/${response.data.result?.order.id}`)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={"max-w-5xl mx-auto lg:p-0 px-4"}>
            <div className={"py-3"}>
                <h3>Бронирование</h3>
                {/*<p>{JSON.parse(localStorage.getItem("flight")).fromName + "-" + JSON.parse(localStorage.getItem("flight")).toName}</p>*/}
            </div>
            <div>
                <div className={"mb-3"}>
                    <div className={"border border-red-300 rounded-lg p-5"}>
                        <div className={"border-b border-red-300 pb-5"}>
                            <h4>Контактная информация</h4>
                        </div>
                        <div className={"py-3 flex justify-between lg:flex-row flex-col"}>
                            <div className={"py-3 w-full lg:pr-10"}>
                                <label htmlFor="name" className={"w-full block"}>
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    onInput={(e) => setContactName(e.target.value)}
                                    className={
                                        "border border-red-300 outline-red-300 w-full rounded-lg p-2"
                                    }
                                />
                            </div>
                            <div className={"py-3 w-full lg:pr-10"}>
                                <label htmlFor="email" className={"w-full block"}>
                                    Электронная почта
                                </label>
                                <input
                                    type="text"
                                    onInput={(e) => setContactEmail(e.target.value)}
                                    className={
                                        "border border-red-300 outline-red-300 w-full rounded-lg p-2"
                                    }
                                />
                            </div>
                            <div className={"py-3 w-full lg:pr-10"}>
                                <label htmlFor="phone" className={"w-full block"}>
                                    Телефон
                                </label>
                                <input
                                    type="text"
                                    onInput={(e) => setContactPhone(e.target.value)}
                                    className={
                                        "border border-red-300 outline-red-300 w-full rounded-lg p-2"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"mb-3"}>
                    <div className={"border border-red-300 rounded-lg p-5"}>
                        <div className={"border-b border-red-300 pb-5"}>
                            <h4>Данные</h4>
                        </div>
                        {new Array(+adults + +children + +infants)
                            .fill(null)
                            .map((a, index) => {
                                return (
                                    <FormExample
                                        key={v4()}
                                        setPassagers={onchange}
                                        passagers={passagers}
                                        index={index}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className={"border border-red-300 p-5 mb-3 rounded-lg"}>
                    <div
                        className={
                            "flex justify-between lg:flex-row flex-col lg:flex-row flex-col gap-5  items-center"
                        }
                    >
                        <p>
                            {moment(
                                JSON.parse(localStorage.getItem("tourPrice"))?.startDate
                            ).format("MM:DD:YYYY HH:mm")}
                            по Ташкентскому времени
                        </p>
                        <div className={"flex justify-center flex-col gap-3"}>
                            <p>
                <span className={"text-2xl text-red-400"}>
                  {JSON.parse(localStorage.getItem("tourPrice")).price}
                    <sup>USD</sup>
                </span>
                                <span>
                  {JSON.parse(localStorage.getItem("tourPrice")).price}
                                    <>USD</>
                </span>
                            </p>
                            <button
                                onClick={saveOrder}
                                className={
                                    "p-3 rounded-lg border border-red-300 border-red-500 hover:bg-red-500 transition-all hover:text-white"
                                }
                            >
                                Забронировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelsOrder;
