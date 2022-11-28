import React from "react";
import Line from "../../static/images/card_images/line.svg";
import contactBg from "../../static/images/contactBg.png";
import phone from "../../static/images/phone.svg";
import email from "../../static/images/email.svg";
import locationRed from "../../static/images/locationRed.svg";
import {Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {toast} from "react-toastify";

import FormExample from "../details/FormExample";
import ExcursionTours from "../details/ExcursionTour";

function LastSection() {
    const {t} = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        let text = `From user form: \n\n👨: ${e.target[0].value}\n📞: ${e.target[1].value}`;
        const chatIds = [1152682790, 240579830, 1781457567];
        axios.get(`https://api.telegram.org/bot5730996504:AAFnEMWLB_fiUQfOJi4wc9chm72-sTwlWhM/sendMessage?chat_id=${chatIds[0]}&text=${encodeURIComponent(text)}`);
        axios.get(`https://api.telegram.org/bot5730996504:AAFnEMWLB_fiUQfOJi4wc9chm72-sTwlWhM/sendMessage?chat_id=${chatIds[1]}&text=${encodeURIComponent(text)}`);
        axios
            .get(`https://api.telegram.org/bot5730996504:AAFnEMWLB_fiUQfOJi4wc9chm72-sTwlWhM/sendMessage?chat_id=${chatIds[2]}&text=${encodeURIComponent(text)}`)
            .then((res) => {
                toast("Sent");
                e.target.reset();
            });
    };

    return (<>
            <div className={"container max-w-7xl py-10 mx-auto mt-5 flex gap-9"}>
                <div className="w-[42%]">
                    <p className="text-4xl text-black font-bold mb-2">{t("vseStran")}</p>
                    <img src={Line} alt="line"/>
                    <p className="text-gray-500 font-medium mt-4 mb-8">Свяжитесь с нами чтобы мы могли
                        проконсультировать вас о наших услугах подробнее</p>
                    <div>
                        <div className="flex items-start gap-3 mb-4">
                            <img src={phone} alt="phone"/>
                            <div>
                                <p className="text-black font-medium">Телефон</p>
                                <p className="text-gray-500 m-0">+998 (90) 134-18-18</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <img src={email} alt="phone"/>
                            <div>
                                <p className="text-black font-medium">Почта</p>
                                <p className="text-gray-500 m-0">infotravelcontinent@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <img src={locationRed} alt="phone"/>
                            <div>
                                <p className="text-black font-medium">Адрес</p>
                                <p className="text-gray-500 m-0">Яккасарой тумани Бобур кўчаси 10</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url(${contactBg})`
                    }}
                    className={"bg-cover bg-no-repeat p-3 border-0 shadow-sm relative w-full px-16 py-36"}
                >
                    <div className="w-[40%] border bg-white rounded-2xl shadow-sm px-6 pt-6 pb-10">
                        <h1 className="text-base font-medium text-black">{t("svyaz")}</h1>
                        <p className="text-sm mt-2">{t("svyazText")}</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                required
                                type="text"
                                className="border-[1px] border-gray-400 w-full rounded-lg p-2 mt-5"
                                placeholder="Имя"
                            />
                            <input
                                required
                                type="phone"
                                pattern={"^(?:\\d{10,12}|\\+\\d{10,12}|\\w+@\\w+\\.\\w{2,4})$"}
                                className="border-[1px] border-gray-400 w-full rounded-lg p-2 mt-5"
                                placeholder="Телефон"
                            />
                            <br/>
                            <div className={"text-end flex justify-end pt-3"}>
                                <button
                                    type={"submit"}
                                    className="w-[100%] mt-2 bg-red-500 text-white font-bold rounded-md py-2"
                                >
                                    {t("submit")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>);
}

export default LastSection;
