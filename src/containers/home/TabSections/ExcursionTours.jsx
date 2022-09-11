import React, {useState} from 'react';
import exTour from "../../../constants/exTour";
import {useNavigate} from "react-router-dom";
import {BiStar} from "react-icons/bi";

function ExcursionTours() {
    const navigate = useNavigate();
    const [countP, setCountP] = useState(1);

    const orderEx = (type, cost) => {
        navigate(`/excursion/${type}_${cost}_${countP}`)
    }

    return (<div className="max-w-5xl mx-auto py-40">
        <div className={"flex justify-between gap-5"}>
            {exTour.map((a, c) => {
                return (<div
                    className={"border-2 border-red-500 bg-blue-800 text-white w-full p-4 rounded-lg backdrop-blur-lg"}>
                    <p className={"text-2xl font-bold"}>{a.name}</p>
                    <div className={"flex justify-between items-center"}>
                        <p className={"text-xl"}>{a.typeOfEx}</p>
                        <p className={"text-2xl"}>${a.price}</p>
                    </div>
                    <p>Отел
                        <div className={"flex gap-1"}>
                            {new Array(a.hotelStars).fill(null).map((a, b) => {
                                return <BiStar color={"red"}/>
                            })}
                        </div>
                    </p>
                    <div className={"flex justify-between items-center gap-5 pt-5"}>
                        <input onInput={(e) => setCountP(e.target.value)} type="number"
                               className={"w-full text-white p-2 rounded-lg bg-transparent border-2"}
                               id={"as"}/>
                        <button onClick={() => orderEx(a.typeOfEx, countP * a.price)}
                                className={"bg-red-500 text-white px-4 py-2 rounded-lg"}>Заказать
                        </button>
                    </div>
                </div>)
            })}
        </div>
    </div>)
}

export default ExcursionTours
