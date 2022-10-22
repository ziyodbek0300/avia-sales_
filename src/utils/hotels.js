import moment from "moment";
import {getHtplace} from "../constants/htplace";

export function populateHotels(hotels, dates, categories) {
    const now = moment(dates?.date2); //todays date
    const end = moment(dates?.date1); // another date
    const duration = moment.duration(now.diff(end));
    const days = duration.asDays();
    const totalAge = categories.adults + categories.children + categories.infant
    let arr = [];
    let isReturn = null

    const list = hotels.filter(hotel => Array.isArray(hotel.price));

    const response = list.map(e => {

        const htplace =
            Array.isArray(e?.price) &&
            e?.price?.map((e) => {
                return getHtplace(e?.htplace);
            }).filter((item) => item);


        Array.isArray(htplace) &&
        htplace?.map((r) => {
            if (+r?.pcount >= totalAge) {
                if (
                    +r?.adult >= categories.adults &&
                    +r?.child >= categories.children &&
                    +r?.infant >= categories.infant
                ) return arr.push(r);
            }
        });


        if (arr.length > 0) {
            isReturn = { bool: true, arr };
        } else {
            isReturn = { bool: false, arr: [] };
        }


        const unOrderedPrice = e?.price?.map((e) => {

            let bool = false;

            Array.isArray(isReturn.arr) &&
            isReturn.arr?.map((r) => {
                if (r.in === e.htplace) {
                    bool = true;
                }
            });

            if (bool) return e;
        }).filter((item) => item);

        const multipliedPrice = unOrderedPrice[0] ? unOrderedPrice[0]?.price * Math.ceil(days) : 0;

        return {...e, sortField: multipliedPrice}
    });

    return response.sort((next, prev) => next.sortField - prev.sortField);
}