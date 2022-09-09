import moment from "moment";

const arr = [{
    name: 'Умра зиёрати',
    typeOfEx: 'Стандарт',
    price: 2100,
    madinaNights: 4,
    makkaNights: 10,
    items: ['✈️  АВИАЧИПТА', '🏨 МEХМОНХОНА', '🍽 2-МАХАЛ ОВКАТ', '🚌 АВТОБУС ХИЗМАТИ', '📃 СУГИРТА', '👳‍♂️ ЭЛЛИК БОШИ ХИЗМАТИ', '💼 СУМКА', '🦺 НИМЧА', '📖 УМРА ҚОЛЛАНМАСИ', '✅ МАККА ВА МАДИНАДА ЭКИСКУРЦИЯ'],
    located: '1 km',
    departureTime: moment('2022-09-17').toDate(),
    hotelStars: 5,
    meals: {
        time: 2, times: ['Нонушта', 'Кечки']
    }
}, {
    name: 'Умра зиёрати',
    typeOfEx: 'Лйукс',
    price: 2300,
    madinaNights: 4,
    makkaNights: 10,
    items: ['✈️  АВИАЧИПТА', '🏨 МEХМОНХОНА', '🍽 2-МАХАЛ ОВКАТ', '🚌 АВТОБУС ХИЗМАТИ', '📃 СУГИРТА', '👳‍♂️ ЭЛЛИК БОШИ ХИЗМАТИ', '💼 СУМКА', '🦺 НИМЧА', '📖 УМРА ҚОЛЛАНМАСИ', '✅ МАККА ВА МАДИНАДА ЭКИСКУРЦИЯ'],
    located: 'Якинида жойлашган',
    departureTime: moment('2022-09-17').toDate(),
    hotelStars: 5,
    meals: {
        time: 2, times: ['Нонушта', 'Кечки']
    }
}, {
    name: 'Умра зиёрати',
    typeOfEx: 'ВИП',
    price: 2600,
    madinaNights: 4,
    makkaNights: 10,
    items: ['✈️  АВИАЧИПТА', '🏨 МEХМОНХОНА', '🍽 2-МАХАЛ ОВКАТ', '🚌 АВТОБУС ХИЗМАТИ', '📃 СУГИРТА', '👳‍♂️ ЭЛЛИК БОШИ ХИЗМАТИ', '💼 СУМКА', '🦺 НИМЧА', '📖 УМРА ҚОЛЛАНМАСИ', '✅ МАККА ВА МАДИНАДА ЭКИСКУРЦИЯ'],
    located: 'Ёнида жойлашган',
    departureTime: moment('2022-09-17').toDate(),
    hotelStars: 5,
    meals: {
        time: 2, times: ['Нонушта', 'Кечки']
    }
}]

export default arr;
