import React from 'react'
import Logo from '../../static/images/logo.png';
import Logo1 from '../../static/images/air-arabia.jpg';
import Logo2 from '../../static/images/qanot-sharq.png'
import Logo3 from '../../static/images/uzbekistan-airways.jpg'
import Master from '../../static/images/master.jpg'
import Visa from '../../static/images/visa.jpg'
import Uzcard from '../../static/images/uzcard.jpg'
import Qr from '../../static/images/qr.png'
import { FaFacebook, FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

function Footer() {
    return (
        <footer>
            <div className="max-w-5xl mx-auto flex justify-between items-center py-4">
                <img src={Logo1} className="w-[12%]" height="120" style={{ objectFit: 'contain' }} alt="airways" />
                <img src={Logo2} className="w-[20%]" style={{ objectFit: 'contain' }} alt="airways" />
                <img src={Logo3} className="w-[16%]" height="120" style={{ objectFit: 'contain' }} alt="airways" />
                <img src={Visa} className="w-[8%]" style={{ objectFit: 'contain' }} alt="visa" />
                <img src={Master} className="w-[8%]" style={{ objectFit: 'contain' }} alt="master" />
                <img src={Uzcard} className="w-[8%]" style={{ objectFit: 'contain' }} alt="uzcard" />
            </div>
            <div className='flex justify-between items-center max-w-5xl mx-auto mt-7'>
                <div className='w-[25%]'>
                    <img src={Logo} alt="logo" />
                </div>
                <ul className='flex gap-7'>
                    <li>Турпакеты</li>
                    <li>Авиабилеты</li>
                    <li>Экскурсионные туры</li>
                    <li>Отели</li>
                    <li>Визы</li>
                    <li>Трансферы</li>
                </ul>
                <div>
                    <img src={Qr} className="w-16" alt="qr-code" />
                </div>
            </div>
            <div className=" bg-black py-6 mt-7">
                <div className="flex max-w-5xl mx-auto justify-between items-center gap-2">
                    <p className='text-gray-100 font-medium'>Copyright ©2022 All rights reserved</p>
                    <div className='flex gap-4'>
                        <a href='https://t.me/Travelcontinent' target='blank' className='text-white text-2xl'>
                            <FaTelegramPlane />
                        </a>
                        <a href='https://www.instagram.com/travelcontinent.uz/' target='blank' className='text-white text-2xl'>
                            <FaInstagram />
                        </a>
                        <a href='https://www.facebook.com/travelcontinent.uz/' target='blank' className='text-white text-2xl'>
                            <FaFacebook />
                        </a>
                        <a href='https://www.youtube.com/travelcontinent.uz/' target='blank' className='text-white text-2xl'>
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer