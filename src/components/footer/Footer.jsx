import React from 'react'
import Logo from '../../static/images/logo1.png'
import Master from '../../static/images/master.jpg'
import Visa from '../../static/images/visa.jpg'
import Uzcard from '../../static/images/uzcard.jpg'
import Qr from '../../static/images/qr.png'
import {FaFacebook, FaInstagram, FaTelegramPlane, FaYoutube} from 'react-icons/fa'

function Footer() {
    return (
        <footer>
            <div className="max-w-5xl mx-auto border-t flex justify-between py-4 flex-wrap">
                <img src={Logo} alt="airways"/>

                <div>
                    <p>Payment methods</p>
                    <div className='flex gap-1'>
                        <img className='w-16 h-12' src={Visa} alt="visa"/>
                        <img className='w-16 h-12' src={Master} alt="master"/>
                        <img className='w-16 h-12' src={Uzcard} alt="uzcard"/>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <img src={Qr} className="w-24" alt="qr-code"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className='flex gap-2'>
                            <a href='https://t.me/Travelcontinent' target='blank'
                               className='h-10 w-10 border border-red-500 text-red-500 hover:text-white rounded-full flex justify-center items-center hover:bg-red-500 transition-all'>
                                <FaTelegramPlane/>
                            </a>
                            <a href='https://www.instagram.com/travelcontinent.uz/' target='blank'
                               className='h-10 w-10 border border-red-500 text-red-500 hover:text-white rounded-full flex justify-center items-center hover:bg-red-500 transition-all'>
                                <FaInstagram/>
                            </a>
                            <a href='https://www.facebook.com/travelcontinent.uz/' target='blank'
                               className='h-10 w-10 border border-red-500 text-red-500 hover:text-white rounded-full flex justify-center items-center hover:bg-red-500 transition-all'>
                                <FaFacebook/>
                            </a>
                            <div
                                className='h-10 w-10 border border-red-500 text-red-500 hover:text-white rounded-full flex justify-center items-center hover:bg-red-500 transition-all'>
                                <FaYoutube/>
                            </div>
                        </div>
                        <p>
                            <a href="tel:+998901341818" className='text-blue-600 font-bold'>+998(90)134-18-18</a>
                        </p>
                        <p>
                            <a href="mailto:infotravelcontinent@gmail.com"
                               className='text-blue-600 font-bold'>infotravelcontinent@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer