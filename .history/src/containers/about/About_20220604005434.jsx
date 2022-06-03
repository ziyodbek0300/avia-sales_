import React from 'react'

function About() {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='my-3'>
                <p className='text-4xl font-bold mb-3'>О нас</p>
                <p className='text-xl mb-2'>
                    Asia Luxe Travel – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме.
                </p>
                <p className='text-xl'>
                    <b>Только проверенные партнеры</b>
                    Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности. Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='text-2xl font-normal my-3'>Цели и миссия</p>
                <p className='text-lg'>
                    Миссия Asia Luxe Travel заключается в том, чтобы максимально способствовать созданию цивилизованного туристского рынка, где отношения в цепочке клиент - агент - оператор основаны на взаимном доверии и уважении. Конечная цель деятельности компании - сделать качественный отдых доступным для всех категорий населения Узбекистана.
                </p>
            </div>
            <div className='my-3'>
                <p className='text-4xl font-bold mb-3'>О миссия</p>
                <p className='text-xl mb-2'>
                    Asia Luxe Travel – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме.
                </p>
                <p className='text-xl'>
                    <b>Только проверенные партнеры</b>
                    Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности. Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='text-2xl font-normal my-3'>Цели и миссия</p>
                <p className='text-lg'>
                    Миссия Asia Luxe Travel заключается в том, чтобы максимально способствовать созданию цивилизованного туристского рынка, где отношения в цепочке клиент - агент - оператор основаны на взаимном доверии и уважении. Конечная цель деятельности компании - сделать качественный отдых доступным для всех категорий населения Узбекистана.
                </p>
            </div>
            <div className='my-3 grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-4 col-start-1 col-end-2'>
                    <p className='text-2xl font-bold'>Главный офис</p>
                    <p className='text-lg'>Ташкент, Узбекистан ул. Саида Барака, 24</p>
                    <p className='text-lg'>info@tr.uz</p>
                    <p className='text-lg'>+998 94 107 99 90</p>
                </div>
                <div className='w-full' style={{ position: "relative", overflow: "hidden" }}><a className='w-full' href="https://yandex.com/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Toshkent</a><a href="https://yandex.com/maps/10335/tashkent/?ll=69.252730%2C41.330730&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=69.248940%2C41.333729&whatshere%5Bzoom%5D=14.18&z=14.18" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }} className="w-full">Sebzor mahallasi — Yandex Xarita</a><iframe className='w-full' src="https://yandex.com/map-widget/v1/-/CCUJu-CGwD" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }}></iframe></div>
            </div>
        </div>
    )
}

export default About