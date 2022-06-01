import React from 'react'
import { FaUser } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className='border-b border-b-slate-500'>
        <div className="logo"></div>
        <ul className='flex gap-2'>
            <li>Biz haqimizda</li>
            <li>Biletlar</li>
            <li>Hamkorlarga</li>
        </ul>
        <ul>
            <li>
               <FaUser />&nbsp;Kirish 
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
  )
}

export default Navbar