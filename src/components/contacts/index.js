import React from 'react';
import line from "../../static/images/card_images/line.svg";

function Contacts() {
    return (
        <div className={"max-w-5xl mx-auto mt-24"}>
            <div className='text-center'>
                <p className='text-4xl font-bold mb-2'>Контакты</p>
                <img className='mx-auto' src={line} alt="line" />
                <p className='w-[75%] mx-auto text-gray-500 text-base mb-12 mt-4'>
                    Компания приглашает к сотрудничеству авиакассы, туристические агентства и туроператоров. Предлагаем выгодные тарифы на авиабилеты, отели, туры, повышенную комиссию, технологические решения для туристической отрасли.
                </p>
            </div>
            <div className='my-3 grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2 col-start-1 col-end-2'>
                    <p className='text-2xl font-bold'>Главный офис</p>
                    <p className='text-lg'>Яккасарой тумани Бобур кўчаси 10</p>
                    <p className='text-lg'><a href="mailto:infotravelcontinent@gmail.com">infotravelcontinent@gmail.com</a></p>
                    <div>
                        <p className='text-lg'><a href="tel:+99891 003 88 88">+99891 003 88 88</a></p>
                        <p className='text-lg'><a href="tel:+99890 134 18 18">+99890 134 18 18</a></p>
                    </div>
                    <p>
                        Компания приглашает к сотрудничеству авиакассы, туристические агентства и туроператоров. Предлагаем выгодные тарифы на авиабилеты, отели, туры, повышенную комиссию, технологические решения для туристической отрасли.
                    </p>
                </div>
                <div className='w-full col-start-2 col-end-5 flex justify-end' style={{ position: "relative", overflow: "hidden" }}><a className='w-full' href="https://yandex.com/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Toshkent</a><a href="https://yandex.com/maps/10335/tashkent/house/YkAYdAJgSU0EQFprfX54dHlgZA==/?ll=69.249879%2C41.295359&utm_medium=mapframe&utm_source=maps&z=17" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>Oʻrikzor koʻchasi, 140 — Yandex Xarita</a><iframe src="https://yandex.com/map-widget/v1/-/CCUR4BFzxA" width="100%" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }} title="yandex"></iframe></div>
            </div>
        </div>
    );
}

export default Contacts;