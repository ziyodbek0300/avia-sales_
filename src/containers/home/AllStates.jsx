import React from 'react'
import { Link } from 'react-router-dom'
import bgImg7 from "../../static/images/7.jpg";
import bgImg8 from "../../static/images/8.jpg";
import bgImg9 from "../../static/images/9.jpg";
import {useTranslation} from "react-i18next";

function AllStates() {
    const {t} = useTranslation();

    return (
        <div className={"pb-5 max-w-5xl mx-auto mt-5 text-2xl"}>
            <p className="text-3xl text-gray-500 font-bold mb-3">{t('vseStran')}</p>
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
            </div>
        </div>
    )
}

export default AllStates
