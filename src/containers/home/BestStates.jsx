import React from 'react'
import { Link } from 'react-router-dom'
import bgImg1 from "../../static/images/0011.png";
import bgImg2 from "../../static/images/0012.png";
import bgImg3 from "../../static/images/0013.png";
import bgImg4 from "../../static/images/0014.png";
import bgImg5 from "../../static/images/0015.png";
import bgImg6 from "../../static/images/0016.png";
import {useTranslation} from "react-i18next";
import line from "../../static/images/card_images/line.svg";

function BestStates() {
    const {t} = useTranslation();

    return (
        <>
            <div className={"pb-4 max-w-5xl mx-auto mt-5 pt-16 text-2xl"}>
                <div className='text-center'>
                    <p className='text-4xl font-bold mb-2'>Лучшие страны</p>
                    <img className='mx-auto' src={line} alt="line" />
                    <p className='w-[55%] mx-auto text-gray-500 text-base mb-12 mt-4'>
                        Представляем вам лучшие страны по мнению наших клиентов. Выберите одну из представленных стран для путешествия!
                    </p>
                </div>
                <div className={"main-courses fw-bold fs-4"}>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg1})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example col-start-1 col-end-3 rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl left-3"
                            to="/video/1"
                        >
                            {t('dubai')}
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg2})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl left-3"
                            to="/video/1"
                        >
                            {t('medina')}
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg3})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl left-3"
                            to="/video/1"
                        >
                            {t('jidda')}
                        </Link>
                    </div>
                </div>
            </div>
            <div className={"pb-4 max-w-5xl mx-auto mt-5 text-2xl"}>
                <div className={"h-80 main-courses fw-bold gap-3 fs-4"}>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg4})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm font-bold w-full relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3  text-3xl left-3"
                            to="/video/1"
                        >
                            Мекка
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg5})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl left-3"
                            to="/video/1"
                        >
                            Абу-Даби
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg6})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example col-start-3 col-end-5 rounded-2xl card p-3 border-0 shadow-sm font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl left-3"
                            to="/video/1"
                        >
                            Харам
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestStates
