import React from 'react'
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from '../../static/images/logo.png'

function Navbar() {
    return (
        <div className='py-3'>
            <nav className='flex justify-between items-center max-w-5xl mx-auto'>
                <div className="logo">
                    <NavLink to='/'>
                        <img src={Logo} className="w-40" alt="logo" />
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
                        <FaUser />&nbsp;Войти
                    </li>
                    <li>
                        <select name="lang" id="lang" className='border-slate-500'>
                            <option value="uz">Uz</option>
                            <option value="uz">Ru</option>
                            <option value="uz">En</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar