import React from 'react'
import bgImg11 from "../../static/images/11-min.jpg";
import {Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import axios from "axios";

function LastSection() {
    const {t} = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        let text = `From user form: \n\n👨: ${e.target[0].value}\n📞: ${e.target[1].value}`;
        const chatIds = [1152682790];
        axios.get(`https://api.telegram.org/bot5730996504:AAFnEMWLB_fiUQfOJi4wc9chm72-sTwlWhM/sendMessage?chat_id=${chatIds[0]}&text=${encodeURIComponent(text)}`).then(res => {
            alert("Sent")
        })
    }

    return (
        <Container className={"max-w-5xl py-10 mx-auto mt-5"}>
            <p className="text-2xl text-gray-500 font-bold mb-3">{t('vseStran')}</p>
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
                        {t('svyaz')}
                    </h1>
                    <p className="text-lg my-2">
                        {t('svyazText')}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="border-2 w-full rounded-lg p-2 mt-5"
                            placeholder="Name"
                        />
                        <input
                            type="phone"
                            pattern={"^(?:\\d{10,12}|\\+\\d{10,12}|\\w+@\\w+\\.\\w{2,4})$"}
                            className="border-2 w-full rounded-lg p-2 mt-5"
                            placeholder="Phone"
                        />
                        <br/>
                        <div className={"text-end flex justify-end pt-3"}>
                            <button type={"submit"} className="border-2 mt-2 border-gray-400 rounded-md p-1">
                                {t('submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default LastSection
