export const VISA_STATE = ["Саудовская Аравия", "Дубай"];

export const VISA_PRICE = [1500, 350, 350];

export const VISA_PRICE2 = [
  {
    id: 3,
    name: "Однократная виза на месяц",
    isMulti: false,
    length: 30,
    price: {
      adults: 80,
      children: 35,
    },
  },
  {
    id: 4,
    name: "Многократная виза на месяц",
    length: 30,
    isMulti: true,
    price: {
      adults: 210,
      children: 110,
    },
  },
  {
    id: 5,
    name: "Однократная виза на 3 месяца",
    length: 90,
    isMulti: false,
    price: {
      adults: 215,
      children: 80,
    },
  },
  {
    id: 6,
    name: "Многократная виза на 3 месяца",
    length: 90,
    isMulti: true,
    price: {
      adults: 500,
      children: 230,
    },
  },
  {
    id: 7,
    name: "Транзитная виза на 48 часов",
    isMulti: false,
    length: 2,
    price: {
      adults: 45,
      children: 45,
    },
  },
];

export const VISAS = [
  `Бизнес`,
  `Турист`,
  `Умра`,
  "Однократная виза на месяц",
  "Многократная виза на месяц",
  "Однократная виза на 3 месяца",
  "Многократная виза на 3 месяца",
  "Транзитная виза на 48 часов",
];
