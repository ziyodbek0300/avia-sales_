import React from 'react';
import {useParams} from "react-router-dom";

function Result(props) {
    const params = useParams();
    console.log(params )
    return (<div className={"max-w-5xl mx-auto p-4"}>
        <p className={"text-2xl my-3"}>Проверка</p>
        <div className={"border border-red-300 rounded-lg p-5 mb-6"}>
            <div className={"lg:w-1/2 w-full"}>
                <div className={"mb-4 flex justify-between items-center"}>
                    <label htmlFor="first">Номер заказа (бронирования): </label>
                    <input type="text" className={"border-red-300 rounded border p-2"} placeholder={"95124"}/>
                </div>
                <div className={"mb-4 flex justify-between items-center"}>
                    <label htmlFor="first"> Фамилия пассажира (латини): </label>
                    <input type="text" className={"border-red-300 rounded border p-2"} placeholder={"AKHMADJONOV"}/>
                </div>
                <div className={"text-right"}>
                    <button
                        className={"p-2 border border-red-200 rounded hover:bg-red-500 hover:text-white active:opacity-80 transition"}>Поиск
                    </button>
                </div>
            </div>
        </div>
        <div className={"border border-red-300 rounded-lg p-5 mb-6"}>
            <div className={"lg:w-4/5 w-full"}>
                <div className={"mb-4 flex justify-between items-center"}>
                    <div>
                        <p className={"text-2xl"}>Заказ ID: 90735</p>
                        <p className={""}>от: 31.08.2022 14:40:42</p>
                    </div>
                    <div>
                        <p className={"text-2xl"}>Сумма:</p>
                        <p className={"text-xl"}>825<sup>$</sup></p>
                    </div>
                </div>
                <div className={"mb-4 border lg:w-1/2 w-full border-red-400 rounded-lg p-4"}>
                    <p className={"text-lg"}>Статус оплаты</p>
                    <div className={"flex"}>
                        <p className={"text-lg bg-red-500 text-white p-2"}>Не оплачен</p>
                    </div>
                </div>
                <div>
                    <p className="text-2xl my-3">Пассажиры (1)</p>
                    <div className={""}></div>
                </div>
            </div>
        </div>
    </div>);
}

export default Result;
