import React from 'react'
import bgImg from '../../static/images/1.jpg';
import bgImg2 from '../../static/images/2.jpg';
import bgImg3 from '../../static/images/3.jpg';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Container className={"pb-4 max-w-7xl mx-auto mt-5 text-2xl"}>
                <p className='text-3xl text-gray-500 font-bold mb-3'>Лучшие страны</p>
                <div className={"main-courses fw-bold fs-4"}>
                    <div style={{ backgroundImage: `url(${bgImg})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">БАА</Link>
                    </div>
                    <div style={{ backgroundImage: `url(${bgImg2})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">Мекка</Link>
                    </div>
                </div>
            </Container>
            <Container className={"pb-5 max-w-7xl mx-auto mt-5 text-2xl"}>
                <p className='text-3xl text-gray-500 font-bold mb-3'>Все страны</p>
                <div className={"h-80 gap-3 fw-bold fs-4 grid grid-cols-5"}>
                    <div style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">БАА</Link>
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg2})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">Мекка</Link>
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">БАА</Link>
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg2})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">Мекка</Link>
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">БАА</Link>
                    </div>
                </div>
            </Container>
            <Container className={"max-w-7xl mx-auto mt-5 text-2xl"}>
                <p className='text-3xl text-gray-500 font-bold mb-3'>Все страны</p>
                <div className={"h-80 gap-3 fw-bold fs-4 grid grid-cols-2"}>
                    <div style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2049194677871149) 56%, rgba(216,49,53,0.6194852941176471) 100%), url(${bgImg3})`, textShadow: "1px 1px 15px rgba(0,0,0,1)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">Анталия</Link>
                    </div>
                    <div className='border border-slate-200 rounded-2xl shadow-sm p-4'>
                        <h1 className='text-3xl font-medium text-gray-500'>Свяжитесь с нами</h1>
                        <p className='text-xl my-2'>Свяжитесь с нами. Мы дадим вам много информации. Мы предоставим вам подробную информацию.</p>
                        <input type="text" className='border-2 w-full rounded-lg p-2 mt-5' placeholder='Email' />
                        <br /> <br />
                        <button className='border-2 border-gray-500 rounded-md p-2 mb-2'>Отправлять</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home