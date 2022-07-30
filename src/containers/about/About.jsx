import React from 'react'

function About() {
    return (
        <div className='max-w-5xl mx-auto'>
            <div className='my-3'>
                <p className='text-4xl font-bold mb-3'>О нас</p>
                <p className='text-xl mb-2'>
                    Travelcontinent – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме.
                </p>
                <p className='text-xl'>
                    <b>Только проверенные партнеры</b>
                    Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности. Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='text-2xl font-normal my-3'>Цели и миссия</p>
                <p className='text-lg'>
                    Миссия Travelcontinent заключается в том, чтобы максимально способствовать созданию цивилизованного туристского рынка, где отношения в цепочке клиент - агент - оператор основаны на взаимном доверии и уважении. Конечная цель деятельности компании - сделать качественный отдых доступным для всех категорий населения Узбекистана.
                </p>
            </div>
            <div className='my-3'>
                <p className='text-4xl font-bold mb-3'>О миссия</p>
                <p className='text-xl mb-2'>
                    Travelcontinent – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме.
                </p>
                <p className='text-xl'>
                    <b>Только проверенные партнеры</b>
                    Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности. Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='text-2xl font-normal my-3'>Цели и миссия</p>
                <p className='text-lg'>
                    Миссия Travelcontinent заключается в том, чтобы максимально способствовать созданию цивилизованного туристского рынка, где отношения в цепочке клиент - агент - оператор основаны на взаимном доверии и уважении. Конечная цель деятельности компании - сделать качественный отдых доступным для всех категорий населения Узбекистана.
                </p>
            </div>
            <hr className='my-6' />
            <div className='my-3 grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-4 col-start-1 col-end-2'>
                    <p className='text-2xl font-bold'>Главный офис</p>
                    <p className='text-lg'>Ташкент, Ўзбекистон, ул. Ўрикзор 140</p>
                    <p className='text-lg'><a href="mailto:infotravelcontinent@gmail.com">infotravelcontinent@gmail.com</a></p>
                    <p className='text-lg'><a href="tel:+99891 003 88 88">+99891 003 88 88</a></p>
                    <p className='text-lg'><a href="tel:+99890 134 18 18">+99890 134 18 18</a></p>
                    <p>
                        Компания приглашает к сотрудничеству авиакассы, туристические агентства и туроператоров. Предлагаем выгодные тарифы на авиабилеты, отели, туры, повышенную комиссию, технологические решения для туристической отрасли.
                    </p>
                </div>
                <div className='w-full col-start-2 col-end-5' style={{ position: "relative", overflow: "hidden" }}><a className='w-full' href="https://yandex.com/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Toshkent</a><a href="https://yandex.com/maps/10335/tashkent/house/YkAYdAJgSU0EQFprfX54dHlgZA==/?ll=69.249879%2C41.295359&utm_medium=mapframe&utm_source=maps&z=17" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>Oʻrikzor koʻchasi, 140 — Yandex Xarita</a><iframe src="https://yandex.com/map-widget/v1/-/CCUR4BFzxA" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }} title="yandex"></iframe></div>
            </div>
        </div>
    )
}

export default About