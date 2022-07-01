import React, { useRef } from 'react'
import { useState } from 'react'
import base from '../../axios'
import { userRole } from '../../constants/userRole'
import Contract from '../../static/docs/contract.pdf'

function ForPartners() {
    const password1Ref = useRef()
    const password2Ref = useRef()
    const indicator = useRef()
    const [isStable, setStable] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const { target } = e;
        const formData = new FormData();
        formData.append('fullName', target[0]);
        formData.append('city', target[1]);
        formData.append('nameCompany', target[2]);
        formData.append('phone', target[3]);
        formData.append('email', target[4]);
        formData.append('role', userRole.agent);
        if (isStable) {
            formData.append('password', target[6]);
        } else {
            alert("Password not match.")
        }
        formData.append('doc', target[7].files[0]);

        base.post('/register', formData).then(res => {
            console.log(res);
        }).catch(e => console.log(e))
    }

    const handlePassword2 = (e) => {
        const pass1 = password1Ref.current.value;
        const pass2 = password2Ref.current.value;
        if (pass1 === pass2) {
            indicator.current.style.display = 'none'
            setStable(true)
        } else {
            indicator.current.style.display = 'block'
            setStable(false)
        }
    }

    return (
        <div className='max-w-5xl mx-auto grid grid-cols-2 gap-5 py-8'>
            <div>
                <p className='text-2xl pb-3 font-bold'>Сотрудничество</p>
                <p className='pb-3'>
                    Компания «Travelcontinent» приглашает к сотрудничеству авиакассы, туристические агентства и туроператоров. Предлагаем выгодные тарифы на авиабилеты, отели, туры, повышенную комиссию, технологические решения для туристической отрасли.
                </p>
                <ul className='pl-5'>
                    <li className='li mb-2'>Online бронирование</li>
                    <li className='li mb-2'>Размещение в разделе "Где купить"</li>
                    <li className='li mb-2'>Доступ к заявкам с сайта</li>
                    <li className='li mb-2'>Интуитивный интерфейс с гибкой системой фильтров поиска</li>
                    <li className='li mb-2'>Отчёты по продажам в Личном кабинете</li>
                    <li className='li mb-2'>Просто начать работать</li>
                    <li className='li mb-2'>Высокий уровень безопасности</li>
                </ul>
                <p>Просто заполните заявку и мы свяжемся с Вами для начала нашего сотрудничества!</p>
                <a href={Contract} download className='p-2 text-sm bg-red-500 text-white rounded-lg px-6 my-5 inline-block'>Download Contract</a>
            </div>
            <div>
                <div className='shadow p-3 rounded'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className='w-full text-xs text-gray-500 font-extralight'>Full Name</label>
                            <input name="full_name" required type="text" id='name' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className='w-full text-xs text-gray-500 font-extralight'>City</label>
                            <input name="city" required type="text" list='cities' id='city' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                            <datalist id='cities'>
                                <option value="Tashkent" />
                                <option value="Andijan" />
                                <option value="Samarkhand" />
                            </datalist>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className='w-full text-xs text-gray-500 font-extralight'>Company Name</label>
                            <input name="company" required type="text" id='company' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className='w-full text-xs text-gray-500 font-extralight'>Phone number</label>
                            <input name="phone" required type="phone" id='phone' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='w-full text-xs text-gray-500 font-extralight'>Email (for login)</label>
                            <input name="email" required type="email" id='email' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password1" className='w-full text-xs text-gray-500 font-extralight'>Password</label>
                            <input ref={password1Ref} onChange={handlePassword2} name="password1" required type="password" id='password1' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className='w-full text-xs text-gray-500 font-extralight'>Confirm Password</label>
                            <input ref={password2Ref} onChange={handlePassword2} name="password2" required type="password" id='password2' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                            <div className='text-xs' ref={indicator} style={{ display: 'none' }}>Password not match</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contract" className='w-full text-xs text-gray-500 font-extralight'>Upload contract</label>
                            <input name="contract" required type="file" id='contract' className='p-1 border border-gray-200 rounded w-full focus:outline-none focus:border-red-400' />
                        </div>
                        <div>
                            <button type='submit' className='p-2 w-full text-sm bg-red-500 text-white rounded-lg px-6 my-3'>Registration</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForPartners