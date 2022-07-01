import React from 'react'
import {FaUser} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import Logo from '../../static/images/logo.png'
import {useTranslation} from "react-i18next";
import {langCons} from "../../constants/langCons";

function Navbar() {
    const {t, i18n} = useTranslation();
    return (
        <div className='py-3'>
            <nav className='flex justify-between items-center max-w-5xl mx-auto'>
                <div className="logo">
                    <NavLink to='/'>
                        <img src={Logo} className="w-40" alt="logo"/>
                    </NavLink>
                </div>
                <ul className='flex gap-4'>
                    <li>
                        <NavLink to='/about-us'>О нас</NavLink>
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink to='/where-are-we'>
                            Где мы находимся
                        </NavLink>
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink to='/for-partners'>
                            Агентствам
                        </NavLink>
                    </li>
                </ul>
                <ul className='flex gap-2'>
                    <li className='flex items-center border-r pr-3'>
                        <FaUser/>&nbsp;Войти
                    </li>
                    <li>
                        <select onChange={(e) => i18n.changeLanguage(e.target.value)} name="lang" id="lang"
                                className='border-slate-500'>
                            <option value={langCons.uz}>{t("langUz")}</option>
                            <option value={langCons.ru}>{t("langRu")}</option>
                            <option value={langCons.en}>{t("langEn")}</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar