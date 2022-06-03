import React from 'react'
import bgImg from '../../static/images/1.jpg';
import bgImg2 from '../../static/images/2.jpg';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Container className={"pb-4 max-w-7xl mx-auto mt-5 text-2xl"}>
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
        </div>
    )
}

export default Home