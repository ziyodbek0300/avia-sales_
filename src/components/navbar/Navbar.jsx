import React from 'react'
import {NavLink} from 'react-router-dom';
import Logo from '../../static/images/logo.png'
import {useTranslation} from "react-i18next";
import {BsTelephoneFill} from "react-icons/bs";
import {langCons} from "../../constants/langCons";
import US from 'country-flag-icons/react/3x2/US'
import RU from 'country-flag-icons/react/3x2/RU'
import UZ from 'country-flag-icons/react/3x2/UZ'

function Navbar() {
    const {t, i18n} = useTranslation();

    return (
        <div className='py-3'>
            <nav className='flex flex-wrap justify-between items-center max-w-5xl mx-auto'>
                <div className="logo">
                    <NavLink to='/'>
                        <img src={Logo} className="w-40" alt="logo"/>
                    </NavLink>
                </div>
                <ul className='flex gap-4'>
                    <li>
                        <NavLink to='/about-us'>{t('aboutUs')}</NavLink>
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink to='/where-are-we'>
                            {t('whereWe')}
                        </NavLink>
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink to='/for-partners'>
                            {t('partners')}
                        </NavLink>
                    </li>
                </ul>


                <div className='flex  gap-4'>
                    <div className='flex gap-2'>
                        <BsTelephoneFill className='text-lg text-red-600'/>
                        <a href={"tel:+998901777776"} className='font-bold text-red-600'>+998 (90) 177-77-76</a>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            {<RU title="Russia" className="w-[22px] h-[22px] rounded-[50%]"/>}
                            {/* {<US title="United States" className="w-[22px] h-[22px] rounded-[50%]" />} */}
                            {/* {<UZ title="Uzbekistan" className="w-[22px] h-[22px] rounded-[50%]" />} */}
                        </div>
                        <select
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            name="lang"
                            id="lang"
                            className='border-slate-500 bg-gray-100 rounded-lg font-bold focus:outline-none'>
                            <option className='font-bold' value={langCons.ru}>{t("langRu")}</option>
                            <option className='font-bold' value={langCons.uz}>{t("langUz")}</option>
                            <option className='font-bold' value={langCons.en}>{t("langEn")}</option>
                        </select>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
