import React, {useState} from 'react';
import {v4} from "uuid";
import FormExample from "./FormExample";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import order from "../../api/projectApi/order";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

function Details() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [adults] = useState(id.split('_')[0])
    const [children] = useState(id.split('_')[1])
    const [infants] = useState(id.split('_')[2])
    const [contactName, setContactName] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [comment] = useState("")
    const [passagers, setPassagers] = useState(new Array(+adults + +children + +infants).fill({
        first_name: "", last_name: "", from: "", gender: "", birthday: "", sNum: "", date3: ""
    }))
    const currentUser = useSelector(state => state.user.currentUser);

    const onchange = (data) => {
        setPassagers(data)
    }

    const saveOrder = (e) => {
        e.preventDefault();
        let pass = [];
        // eslint-disable-next-line array-callback-return
        passagers.map(p => {
            pass.push({
                lastname: p.last_name,
                firtname: p.first_name,
                nationality: p.from,
                gender: p.gender,
                filesLink: p.filesLink,
                birthday: moment(p.birthday).toDate(),
                passportNumber: p.sNum,
                endDate: moment(p.date3).toDate()
            })
        })
        let end = moment(JSON.parse(localStorage.getItem("flight")).endTime).toDate();
        let start = moment(JSON.parse(localStorage.getItem("flight")).startTime).toDate();

        let obj = currentUser.id ? {
            flightId: +JSON.parse(localStorage.getItem("flight")).id,
            contactName: contactName,
            email: contactEmail,
            phone: contactPhone,
            comment: comment,
            partnerId: currentUser.id ? currentUser.id : null,
            startDate: start,
            endDate: end,
            orderType: "",
            price: +JSON.parse(localStorage.getItem("flight")).total,
            passagers: pass
        } : {
            flightId: +JSON.parse(localStorage.getItem("flight")).id,
            contactName: contactName,
            email: contactEmail,
            phone: contactPhone,
            comment: comment,
            startDate: start,
            endDate: end,
            orderType: "",
            price: +JSON.parse(localStorage.getItem("flight")).total,
            passagers: pass
        }
        order.addNew(obj).then(response => {
            toast("Забронирован");
            navigate(`/details/result/${response.data.result.order.id}`);
        }).catch(err => {
            console.log(err);
        })

    }

    return (<div className={"max-w-5xl mx-auto lg:p-0 px-4"}>
        <div className={"py-3"}>
            <h3>Бронирование авиабилета</h3>
            <p>{JSON.parse(localStorage.getItem("flight")).fromName + "-" + JSON.parse(localStorage.getItem("flight")).toName}</p>
        </div>
        <div>
            <form onSubmit={saveOrder}>
                <div className={"mb-3"}>
                    <div className={"border border-red-300 rounded-lg p-5"}>
                        <div className={"border-b border-red-300 pb-5"}>
                            <h4>Контактная информация</h4>
                            <p className={"text-xs"}>На почту мы отправим электронный билет, на телефон мы позвоним,
                                если
                                будут изменения в рейсе или в случае других ситуаций</p>
                        </div>
                        <div className={"py-3 flex justify-between lg:flex-row flex-col"}>
                            <div className={"py-3 w-full lg:pr-10"}>
                                <label htmlFor="name" className={"w-full block"}>Имя</label>
                                <input required type="text"
                                       onInput={(e) => setContactName(e.target.value)}
                                       className={"border border-red-300 outline-red-300 w-full rounded-lg p-2"}/>
                            </div>
                            <div className={"py-3 w-full lg:pr-10"}>
                                <label htmlFor="email" className={"w-full block"}>Электронная почта</label>
                                <input required type="text"
                                       onInput={(e) => setContactEmail(e.target.value)}
                                       className={"border border-red-300 outline-red-300 w-full rounded-lg p-2"}/>
                            </div>
                            <div className={"py-3 w-full lg:pr-10"}>
                                <label htmlFor="phone" className={"w-full block"}>Телефон</label>
                                <input required type="text"
                                       onInput={(e) => setContactPhone(e.target.value)}
                                       className={"border border-red-300 outline-red-300 w-full rounded-lg p-2"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"mb-3"}>
                    <div className={"border border-red-300 rounded-lg p-5"}>
                        <div className={"border-b border-red-300 pb-5"}>
                            <h4>Информация о пассажирах</h4>
                            <p className={"text-xs"}>Введите личные данные пассажиров, как указано в документе
                                (паспорте),
                                по которому они полетят. Поля нужно заполнять латинскими буквами.</p>
                        </div>
                        {new Array(+adults + +children + +infants).fill(null).map((a, index) => {
                            return (
                                <FormExample key={v4()} setPassagers={onchange} passagers={passagers} index={index}/>)
                        })}
                    </div>
                </div>
                <div className={"border border-red-300 p-5 mb-3 rounded-lg"}>
                    <div
                        className={"flex justify-between lg:flex-row flex-col lg:flex-row flex-col gap-5  items-center"}>
                        <p>{moment(JSON.parse(localStorage.getItem("flight")).departureTime).format("MM:DD:YYYY HH:mm")} по
                            Ташкентскому времени</p>
                        <div className={"flex justify-center flex-col gap-3"}>
                            <p><span
                                className={"text-2xl text-red-400"}>{JSON.parse(localStorage.getItem("flight")).total * (+adults + +children)}<sup>USD</sup></span> / <span>{JSON.parse(localStorage.getItem("flight")).total * (+adults + +children + +infants)}<>USD</></span>
                            </p>
                            <button
                                type={"submit"}
                                className={"p-3 rounded-lg border border-red-300 border-red-500 hover:bg-red-500 transition-all hover:text-white"}>Забронировать
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>);
}

export default Details;
