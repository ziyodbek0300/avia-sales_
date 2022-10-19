import React from 'react'
import { Link } from 'react-router-dom'
import bgImg from "../../static/images/1.jpg";
import bgImg5 from "../../static/images/5.jpg";
import bgImg3 from "../../static/images/3.jpg";
import bgImg6 from "../../static/images/6-min-min.jpg";
import {useTranslation} from "react-i18next";

function BestStates() {
    const {t} = useTranslation();

    return (
        <>
            <div className={"pb-4 max-w-5xl mx-auto mt-5 text-2xl"}>
                <p className="text-3xl text-gray-500 font-bold mb-3">{t('luchshi')}</p>
                <div className={"main-courses fw-bold fs-4"}>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl right-3"
                            to="/video/1"
                        >
                            {t('dubai')}
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg5})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl right-3"
                            to="/video/1"
                        >
                            {t('medina')}
                        </Link>
                    </div>
                </div>
            </div>
            <div className={"pb-4 max-w-5xl mx-auto mt-5 text-2xl"}>
                <div className={"h-80 flex fw-bold gap-3 fs-4"}>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg6})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm font-bold w-full relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3  text-3xl right-3"
                            to="/video/1"
                        >
                            {t('jidda')}
                        </Link>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${bgImg3})`,
                            textShadow: "1px 1px 15px rgba(0,0,0,1)",
                        }}
                        className={
                            "bg-example rounded-2xl card p-3 border-0 shadow-sm w-1/3 font-bold relative"
                        }
                    >
                        <Link
                            className="text-decoration-none text-white absolute bottom-3 text-3xl right-3"
                            to="/video/1"
                        >
                            {t("abuDabi")}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestStates
