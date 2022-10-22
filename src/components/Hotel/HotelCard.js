import React from 'react';


export default function HotelCard({hotel}) {
    console.log("hotel", hotel);
    return (
        <div style={{display: "flex"}}>
            <img
                className="rounded"
                width="200"
                style={{ maxHeight: "200px", marginRight: ".5rem" }}
                src={`http://smartsys.intouch.ae/b2b/hotelimages?samo_action=get&hotel=${hotel.inc}&id=0&equilateral=1&width=200&height=200&stamp=72BE0B64`}
                alt=""
            />
            <div style={{marginRight: ".5rem"}}>{hotel.name}</div>
            <div>{hotel.sortField}$</div>
        </div>
    );
};

