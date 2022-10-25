import React, {useState} from "react";
import exTour from "../../../constants/exTour";
import {useNavigate} from "react-router-dom";
// import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";
import NavS from "../NavS";
import makkah from "../../../static/images/card_images/makkah.png";
import calendar from "../../../static/images/card_images/calendar.svg";
import star from "../../../static/images/card_images/star.svg";
import tick from "../../../static/images/card_images/tick-circle.svg";
import Contacts from "../../../components/contacts";

function ExcursionTours() {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    const [countP, setCountP] = useState(1);
    const user = useSelector((state) => state.user.currentUser);
    const orderEx = (type, cost) => {
        navigate(`/excursion/${type}_${cost}_${countP}`);
    };
    const texts1 = ["Ночь в Мадине: 4", "Ночь в Мекке: 10", "Авиабилет", "Отель", "Двойное питание", "Автобусное обслуживание", "Страхование", "Фентив сервис", "Сумка", "Жилет", "Заявление УМРА", "Экскурсия в Мекку и Медину"]

    const drawStar = (starsC) => {
        let stars = []
        for (let i = 0; i < starsC; i++) {
            stars.push(<img key={i} src={star}/>);
        }
        return stars;
    }

    const Write = texts1.map((t1, index) =>
        <div key={index} className='flex items-center gap-2 mb-3'>
            <img src={tick} alt="tick"/>
            <p className='text-base font-medium'>{t1}</p>
        </div>
    )

    return (
        <>
            <div className={"header third"}>
                <NavS/>
                <div className="max-w-5xl mx-auto pt-36">
                    <div className={"text-center mb-10 text-white"}>
                        <h1 className={"text-7xl mb-4 font-bold"}>Экскурсионные туры</h1>
                    </div>
                    <div className={"flex justify-between gap-5"}>
                        {exTour.map((a, c) => {
                            return (
                                <div
                                >
                                    <div
                                        style={{boxShadow: "2px 8px 40px rgba(108, 108, 108, 0.05)"}}
                                        className='w-full bg-white rounded-2xl border text-start'>
                                        <div className='relative'>
                                            <div>
                                                <img src={makkah} alt="makkah"/>
                                            </div>
                                            <p className='absolute bg-red-600 py-1 px-2 inline-block right-0 top-4 rounded-l-lg text-base text-white'>{a.typeOfEx}</p>
                                        </div>
                                        <div className='p-4 pt-1'>
                                            <p className='font-bold text-2xl mt-6 mb-0'>Умра поломничество</p>
                                            <p className='font-bold mt-0'>Прямые рейсы <span
                                                className={"text-red-600"}>(TAS-JED-TAS)</span></p>
                                            <p className='text-red-500 font-bold mt-6 mb-9 text-4xl'>${a.price}</p>
                                            <div className='flex items-center gap-2 mb-3'>
                                                <img src={calendar} alt="line"/>
                                                <p className='text-base font-medium'>07-11-2022</p>
                                            </div>
                                            <div className='flex items-center gap-2 mb-3'>
                                                <img src={calendar} alt="line"/>
                                                <p className='text-base font-medium'>21-11-2022</p>
                                            </div>
                                            {/*<div className='flex items-center gap-2 mb-8'>*/}
                                            {/*    <img src={location} alt="line" />*/}
                                            {/*    <p className='text-base font-medium'>1 км из Харам</p>*/}
                                            {/*</div>*/}
                                            <div>
                                                {Write}
                                            </div>
                                            <div className='mt-8'>
                                                <p className='text-gray-500 mb-2'>Выбрать отель:</p>
                                                <div className='flex gap-3'>{drawStar(a.hotelStars)}</div>
                                            </div>
                                            <div
                                                className={"flex justify-between items-center gap-5 pt-5"}
                                            >
                                                <input
                                                    onInput={(e) => setCountP(e.target.value)}
                                                    type="number"
                                                    className={
                                                        "w-full p-2 rounded-lg bg-transparent border-2"
                                                    }
                                                    id={"as"}
                                                />
                                                <button
                                                    onClick={() =>
                                                        orderEx(
                                                            a.typeOfEx,
                                                            user ? countP * a.price : countP * (a.price + 100)
                                                        )
                                                    }
                                                    className={"bg-red-600 text-white px-4 py-2 rounded-lg"}
                                                >
                                                    Заказать
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Contacts/>
        </>
    );
}

export default ExcursionTours;
