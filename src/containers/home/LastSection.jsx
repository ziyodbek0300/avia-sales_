import React from 'react'
import bgImg11 from "../../static/images/11-min.jpg";
import { Container } from "react-bootstrap";

function LastSection() {
    return (
        <Container className={"max-w-5xl py-10 mx-auto mt-5"}>
            <p className="text-2xl text-gray-500 font-bold mb-3">Все страны</p>
            <div className={"h-80 gap-3 fw-bold fs-4 flex"}>
                <div
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg11})`,
                        textShadow: "1px 1px 15px rgba(0,0,0,1)",
                    }}
                    className={
                        "rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative w-full"
                    }
                ></div>
                <div className="border border-slate-200 rounded-2xl shadow-sm p-4">
                    <h1 className="text-3xl font-medium text-gray-500">
                        Свяжитесь с нами
                    </h1>
                    <p className="text-xl my-2">
                        Свяжитесь с нами. Мы дадим вам много информации. Мы предоставим
                        вам подробную информацию.
                    </p>
                    <input
                        type="text"
                        className="border-2 w-full rounded-lg p-2 mt-5"
                        placeholder="Email"
                    />
                    <br />
                    <button className="border-2 mt-2 border-gray-400 rounded-md p-1">
                        Отправлять
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default LastSection