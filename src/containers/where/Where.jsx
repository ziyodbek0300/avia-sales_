import React from 'react'

function Where() {
    return (
        <div className="max-w-5xl mx-auto py-5">
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
                <div className='w-full col-start-2 col-end-5' style={{ position: "relative", overflow: "hidden" }}><a className='w-full' href="https://yandex.com/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Toshkent</a><a href="https://yandex.com/maps/10335/tashkent/?ll=69.252730%2C41.330730&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=69.248940%2C41.333729&whatshere%5Bzoom%5D=14.18&z=14.18" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }} className="w-full">Sebzor mahallasi — Yandex Xarita</a><iframe className='w-full' src="https://yandex.com/map-widget/v1/-/CCUJu-CGwD" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }} title="yandex"></iframe></div>
            </div>
        </div>
    )
}

export default Where