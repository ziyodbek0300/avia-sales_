import React from 'react';
import { useTranslation } from "react-i18next";
import { langCons } from "../../constants/langCons";
import US from 'country-flag-icons/react/3x2/US'
import RU from 'country-flag-icons/react/3x2/RU'
import UZ from 'country-flag-icons/react/3x2/UZ'
import { FaUserAlt } from "react-icons/fa";

function TableNav(props) {
    const { t, i18n } = useTranslation();

    return (
        <div className='py-4 px-10 w-full'>
            <nav className='flex flex-wrap justify-between items-center'>

                <p className='text-2xl font-bold text-black'>Пользователи</p>

                <div className='flex gap-7'>
                    <div className='flex items-center'>
                        <div>
                            {<RU title="Russia" className="w-[22px] h-[22px] rounded-[50%]" />}
                            {/* {<US title="United States" className="w-[22px] h-[22px] rounded-[50%]" />} */}
                            {/* {<UZ title="Uzbekistan" className="w-[22px] h-[22px] rounded-[50%]" />} */}
                        </div>
                        <div>
                            <select
                                onChange={(e) => i18n.changeLanguage(e.target.value)}
                                name="lang"
                                id="lang"
                                className='border-slate-500 w-[12] focus:outline-none'>
                                <option value={langCons.ru}><span className='text-black font-bold'>RU</span></option>
                                <option value={langCons.uz}><span className='text-black font-bold'>UZB</span></option>
                                <option value={langCons.en}><span className='text-black font-bold'>EN</span></option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='bg-black rounded-[50%] grid items-center p-3'>
                            <FaUserAlt className="text-lg text-white" />
                        </div>
                        <div>
                            <p className='text-sm text-gray-700'>Nigora</p>
                            <p className='text-xs text-gray-500 m-0'>nigora.travel@gmail.com</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TableNav;