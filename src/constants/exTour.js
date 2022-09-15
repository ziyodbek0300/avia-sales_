import moment from "moment";

const arr = [{
    name: 'Умра зиёрати',
    typeOfEx: 'Стандарт',
    price: 2100,
    madinaNights: 4,
    makkaNights: 10,
    items: ['✈️  АВИАБИЛЕТ', '🏨 ОТЕЛЬ', '🍽 ДВОЙНОЕ ПИТАНИЕ', '🚌 АВТОБУСНОЕ ОБСЛУЖИВАНИЕ', '📃 СТРАХОВАНИЕ', '👳‍♂️ ФЕНТИВ СЕРВИС', '💼 СУМКА', '🦺 ЖИЛЕТ', '📖 ЗАЯВЛЕНИЕ УМРА', '✅ ЭКСКУРСИЯ В МЕККУ И МЕДИНУ'],
    located: '1 км',
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
    items: ['✈️  АВИАБИЛЕТ', '🏨 ОТЕЛЬ', '🍽 ДВОЙНОЕ ПИТАНИЕ', '🚌 АВТОБУСНОЕ ОБСЛУЖИВАНИЕ', '📃 СТРАХОВАНИЕ', '👳‍♂️ ФЕНТИВ СЕРВИС', '💼 СУМКА', '🦺 ЖИЛЕТ', '📖 ЗАЯВЛЕНИЕ УМРА', '✅ ЭКСКУРСИЯ В МЕККУ И МЕДИНУ'],
    located: 'Расположен поблизости',
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
    items: ['✈️  АВИАБИЛЕТ', '🏨 ОТЕЛЬ', '🍽 ДВОЙНОЕ ПИТАНИЕ', '🚌 АВТОБУСНОЕ ОБСЛУЖИВАНИЕ', '📃 СТРАХОВАНИЕ', '👳‍♂️ ФЕНТИВ СЕРВИС', '💼 СУМКА', '🦺 ЖИЛЕТ', '📖 ЗАЯВЛЕНИЕ УМРА', '✅ ЭКСКУРСИЯ В МЕККУ И МЕДИНУ'],
    located: 'Рядом с Харам',
    departureTime: moment('2022-09-17').toDate(),
    hotelStars: 5,
    meals: {
        time: 2, times: ['Нонушта', 'Кечки']
    }
}]

export default arr;
