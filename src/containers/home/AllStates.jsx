import React from 'react'
import { Link } from 'react-router-dom'
import calendar from "../../static/images/card_images/calendar.svg";
import location from "../../static/images/card_images/location.svg";
import line from "../../static/images/card_images/line.svg";
import makkah from "../../static/images/card_images/makkah.png";
import star from "../../static/images/card_images/star.svg";
import tick from "../../static/images/card_images/tick-circle.svg";
import { useTranslation } from "react-i18next";

function AllStates() {
    const { t } = useTranslation();
    const texts1 = ["Ночь в Мадине: 4", "Ночь в Мекке: 10", "Авиабилет", "Отель", "Двойное питание", "Автобусное обслуживание", "Страхование", "Фентив сервис", "Сумка", "Жилет", "Заявление УМРА", "Экскурсия в Мекку и Медину"]
    const Write = texts1.map((t1, index) =>
        <div key={index} className='flex items-center gap-2 mb-3'>
            <img src={tick} alt="tick" />
            <p className='text-base font-medium'>{t1}</p>
        </div>
    )
    const drawStar = () => {
        let stars = []
        for (let i = 0; i < 5; i++) {
            stars.push(<img key={i} src={star} />);
        }
        return stars;
    }
    return (
        <div className={"pb-5 max-w-5xl mx-auto mt-20 text-2xl"}>
            <div className='text-center'>
                <p className='text-4xl font-bold mb-2'>Наши туры</p>
                <img className='mx-auto' src={line} alt="line" />
                <p className='w-[55%] mx-auto text-gray-500 text-base mb-12 mt-4'>Представляем вам лучшие страны по мнению наших клиентов. Выберите одну из представленных стран для путешествия!</p>
            </div>
            <div className='flex justify-between'>
                <div
                    style={{ boxShadow: "2px 8px 40px rgba(108, 108, 108, 0.05)" }}
                    className='w-[31%] bg-white rounded-2xl border text-start'>
                    <div className='relative'>
                        <div>
                            <img src={makkah} alt="makkah" />
                        </div>
                        <p className='absolute bg-red-600 py-1 px-2 inline-block right-0 top-4 rounded-l-lg text-base text-white'>STANDART</p>
                    </div>
                    <div className='p-4 pt-1'>
                        <p className='font-bold text-2xl mt-6 '>Умра поломничество</p>
                        <p className='text-red-500 font-bold mt-6 mb-9 text-4xl'>$2100</p>
                        <div className='flex items-center gap-2 mb-3'>
                            <img src={calendar} alt="line" />
                            <p className='text-base font-medium'>09-17-2022</p>
                        </div>
                        <div className='flex items-center gap-2 mb-8'>
                            <img src={location} alt="line" />
                            <p className='text-base font-medium'>1 км из Харам</p>
                        </div>
                        <div>
                            {Write}
                        </div>
                        <div className='mt-8'>
                            <p className='text-gray-500 mb-2'>Выбрать отель:</p>
                            <div className='flex gap-3'>{drawStar()}</div>
                        </div>
                        <button className='w-[100%] bg-red-600 py-3 rounded-lg text-white font-bold mt-8'>Заказать</button>
                    </div>
                </div>
                <div
                    style={{ boxShadow: "2px 8px 40px rgba(108, 108, 108, 0.05)" }}
                    className='w-[31%] bg-white rounded-2xl border text-start'>
                    <div className='relative'>
                        <div>
                            <img src={makkah} alt="makkah" />
                        </div>
                        <p className='absolute bg-red-600 py-1 px-2 inline-block right-0 top-4 rounded-l-lg text-base text-white'>LUX</p>
                    </div>
                    <div className='p-4 pt-1'>
                        <p className='font-bold text-2xl mt-6 '>Умра поломничество</p>
                        <p className='text-red-500 font-bold mt-6 mb-9 text-4xl'>$2300</p>
                        <div className='flex items-center gap-2 mb-3'>
                            <img src={calendar} alt="line" />
                            <p className='text-base font-medium'>09-17-2022</p>
                        </div>
                        <div className='flex items-center gap-2 mb-8'>
                            <img src={location} alt="line" />
                            <p className='text-base font-medium'>Расположен поблизости</p>
                        </div>
                        <div>
                            {Write}
                        </div>
                        <div className='mt-8'>
                            <p className='text-gray-500 mb-2'>Выбрать отель:</p>
                            <div className='flex gap-3'>{drawStar()}</div>
                        </div>
                        <button className='w-[100%] bg-red-600 py-3 rounded-lg text-white font-bold mt-8'>Заказать</button>
                    </div>
                </div>
                <div
                    style={{ boxShadow: "2px 8px 40px rgba(108, 108, 108, 0.05)" }}
                    className='w-[31%] bg-white rounded-2xl border text-start'>
                    <div className='relative'>
                        <div>
                            <img src={makkah} alt="makkah" />
                        </div>
                        <p className='absolute bg-red-600 py-1 px-2 inline-block right-0 top-4 rounded-l-lg text-base text-white'>V.I.P</p>
                    </div>
                    <div className='p-4 pt-1'>
                        <p className='font-bold text-2xl mt-6 '>Умра поломничество</p>
                        <p className='text-red-500 font-bold mt-6 mb-9 text-4xl'>$2600</p>
                        <div className='flex items-center gap-2 mb-3'>
                            <img src={calendar} alt="line" />
                            <p className='text-base font-medium'>09-17-2022</p>
                        </div>
                        <div className='flex items-center gap-2 mb-8'>
                            <img src={location} alt="line" />
                            <p className='text-base font-medium'>Рядом с Харам</p>
                        </div>
                        <div>
                            {Write}
                        </div>
                        <div className='mt-8'>
                            <p className='text-gray-500 mb-2'>Выбрать отель:</p>
                            <div className='flex gap-3'>{drawStar()}</div>
                        </div>
                        <button className='w-[100%] bg-red-600 py-3 rounded-lg text-white font-bold mt-8'>Заказать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllStates

{/* <p className="text-3xl text-gray-500 font-bold mb-3">{t('vseStran')}</p>
            <div className={"h-80 gap-3 fw-bold fs-4 grid grid-cols-3"}>
                <div
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg7})`,
                        textShadow: "1px 1px 15px rgba(0,0,0,1)",
                    }}
                    className={
                        "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                    }
                >
                    <Link
                        className="text-decoration-none text-white absolute bottom-3 text-2xl right-3"
                        to="/video/1"
                    >
                        {t('uae')}
                    </Link>
                </div>
                <div
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg8})`,
                        textShadow: "1px 1px 15px rgba(0,0,0,1)",
                    }}
                    className={
                        "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                    }
                >
                    <Link
                        className="text-decoration-none text-white absolute bottom-3 text-2xl right-3"
                        to="/video/1"
                    >
                        {t('mekkah')}
                    </Link>
                </div>
                <div
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg9})`,
                        textShadow: "1px 1px 15px rgba(0,0,0,1)",
                    }}
                    className={
                        "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                    }
                >
                    <Link
                        className="text-decoration-none text-white absolute bottom-3 text-2xl right-3"
                        to="/video/1"
                    >
                        {t('saudArabia')}
                    </Link>
                </div>
            </div> */}
