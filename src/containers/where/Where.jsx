import React from 'react'

function Where() {
    return (
        <div className="max-w-5xl mx-auto py-5">
            <div className='my-3 grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-4 col-start-1 col-end-2'>
                    <p className='text-2xl font-bold'>Главный офис</p>
                    <p className='text-lg'>Ташкент, Узбекистан ул. Саида Барака, 24</p>
                    <p className='text-lg'>info@tr.uz</p>
                    <p className='text-lg'>+998 94 107 99 90</p>
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