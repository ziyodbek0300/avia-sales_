import React, {useState} from 'react';
import ReactSelect from "react-select";
import {v4} from "uuid";
import FormExample from "./FormExample";

function Details({adults = 3, children = 1, infants = 2}) {

    const [passagers, setPassagers] = useState(new Array(+adults + +children + +infants).fill({
        first_name: "", last_name: "", from: "", gender: "", birthday: "", sNum: "", date3: ""
    }))

    const onchange = (data)=>{
        setPassagers(data)
    }

    return (<div className={"max-w-5xl mx-auto lg:p-0 px-4"}>
        <div className={"py-3"}>
            <h3>Бронирование авиабилета</h3>
            <p>IST-Ташкент-IST</p>
        </div>
        <div>
            <div className={"mb-3"}>
                <div className={"border rounded-lg p-5"}>
                    <div className={"border-b pb-5"}>
                        <h4>Контактная информация</h4>
                        <p className={"text-xs"}>На почту мы отправим электронный билет, на телефон мы позвоним, если
                            будут изменения в рейсе или в случае других ситуаций</p>
                    </div>
                    <div className={"py-3 flex justify-between lg:flex-row flex-col"}>
                        <div className={"py-3 w-full lg:pr-10"}>
                            <label htmlFor="name" className={"w-full block"}>Имя</label>
                            <input type="text" className={"border outline-red-300 w-full rounded-lg p-2"}/>
                        </div>
                        <div className={"py-3 w-full lg:pr-10"}>
                            <label htmlFor="name" className={"w-full block"}>Электронная почта</label>
                            <input type="text" className={"border outline-red-300 w-full rounded-lg p-2"}/>
                        </div>
                        <div className={"py-3 w-full lg:pr-10"}>
                            <label htmlFor="name" className={"w-full block"}>Телефон</label>
                            <input type="text" className={"border outline-red-300 w-full rounded-lg p-2"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"mb-3"}>
                <div className={"border rounded-lg p-5"}>
                    <div className={"border-b pb-5"}>
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
            <div className={"border p-5 mb-4 rounded-lg"}>
                <div className="">
                    <label htmlFor="comment" className={"block"}>Комментарий</label>
                    <textarea name="comment" className={"w-full border p-2 outline-red-300 rounded-lg"} id="comment"
                              rows={4}></textarea>
                </div>
            </div>
            <div className={"border p-5 mb-3 rounded-lg"}>
                <div className={"flex justify-between lg:flex-row flex-col lg:flex-row flex-col gap-5  items-center"}>
                    <p>25.08.2022 17:09 по Ташкентскому времени</p>
                    <div className={"flex justify-center flex-col gap-3"}>
                        <p><span className={"text-2xl text-red-400"}>13 299 000<sup>UZS</sup></span> / <span>1209<>USD</></span>
                        </p>
                        <button
                            className={"p-3 rounded-lg border border-red-500 hover:bg-red-500 transition-all hover:text-white"}>Забронировать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Details;
