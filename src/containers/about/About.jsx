import React from 'react'
import line from "../../static/images/card_images/line.svg";

function About() {
    return (
        <div className='max-w-5xl mx-auto mt-10 font-[Manrope]'>
            <div className='my-3'>
                <p className='text-4xl font-bold mb-[10px] text-center'>О нас</p>
                <img className='mx-auto mb-12' src={line} alt="line" />
                <p className='text-gray-500 pb-4'>
                    Наше Туристическая компания - Travelcontinent была основана в сентябре 2019 года. Мы оказываем туристические услуги по всему миру.
                    Ставим акцент на арабские страны как Арабские Эмираты и Саудовская Аравия.
                    Наше компания даёт нашим клиентам возможность путешествовать со своими семьями в соответствии с их религиозными убеждениями.
                </p>

                <p className='text-gray-500 pb-4'>
                    Компания предоставляет услуги B2B напрямую туристическим агентствам и услуги B2C клиентам.
                    Дружелюбный и квалифицированный персонал компании будет обслуживать вас 24/7 и постарается сделать ваши путешествия безопасными, веселыми и по-настоящему бескомпромиссными.
                </p>

                <p className="text-gray-500 pb-4">
                    Мы рады создавать удобство для вас!
                </p>

                <p className="text-gray-500 pb-4">
                    Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности.
                    Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='text-gray-500 pb-4'>
                    Travelcontinent – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме.
                </p>
                <p className='text-gray-500'>
                    Только проверенные партнеры Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности. Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='font-semibold my-6'>Цели и миссия</p>
                <p className='text-gray-500'>
                    Миссия Travelcontinent заключается в том, чтобы максимально способствовать созданию цивилизованного туристского рынка, где отношения в цепочке клиент - агент - оператор основаны на взаимном доверии и уважении. Конечная цель деятельности компании - сделать качественный отдых доступным для всех категорий населения Узбекистана.
                </p>
            </div>
            <div className='mt-[100px]'>
                <p className='text-4xl font-bold mb-[10px] text-center'>О миссии</p>
                <img className='mx-auto mb-12' src={line} alt="line" />
                <p className='text-gray-500 mb-8'>
                    <span className='text-red-600'>Travelcontinent</span> – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме.
                </p>
                <p className='text-gray-500'>
                    <b>Только проверенные партнеры</b>
                    Отбирая отели, сотрудники ALT* лично проверяют качество предоставляемого сервиса и уровень безопасности. Компания ALT*, сотрудничая только с надежными проверенными партнерами-авиакомпаниями, гарантирует своим клиентам высокую степень безопасности, комфорта и четкости выполнения полетов.
                </p>
                <p className='font-semibold my-6'>Цели и миссия</p>
                <p className='text-gray-500'>
                    Миссия Travelcontinent заключается в том, чтобы максимально способствовать созданию цивилизованного туристского рынка, где отношения в цепочке клиент - агент - оператор основаны на взаимном доверии и уважении. Конечная цель деятельности компании - сделать качественный отдых доступным для всех категорий населения Узбекистана.
                </p>
            </div>
            <hr className='my-6' />
            <div className='my-3 grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-4 col-start-1 col-end-2'>
                    <p className='text-2xl font-bold'>Главный офис</p>
                    <p className='text-lg'>Яккасарой тумани Бобур кўчаси 10</p>
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