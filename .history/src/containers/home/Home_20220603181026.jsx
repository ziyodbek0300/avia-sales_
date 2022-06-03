import React from 'react'
import bgImg from '../../static/images/1.jpg';
import bgImg2 from '../../static/images/2.jpg';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Container className={"pb-5 max-w-7xl mx-auto mt-5 text-2xl"}>
                <div className={"main-courses fw-bold fs-4"}>
                    <div style={{ backgroundImage: `url(${bgImg})`, textShadow: "10px 10px 10px rgba(0,0,0,0.3)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">БАА</Link>
                    </div>
                    <div style={{ backgroundImage: `url(${bgImg2})`, textShadow: "10px 10px 10px rgba(0,0,0,0.3)" }}
                        className={"rounded-2xl card p-3 border-0 shadow-sm text-orange-400 font-bold relative"}>
                        <Link className="text-decoration-none text-white absolute bottom-3 text-3xl right-3" to="/video/1">Мекка</Link>
                    </div>
                </div>
            </Container>
            <Container className={"pb-5 max-w-7xl mx-auto mt-5 text-2xl"}>
                <div className={"grid grid-cols-3 gap-3 h-96 fw-bold fs-4"}>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg})` }}
                        className={"card p-3 border-0 shadow-sm text-orange-400 col-start-1 col-end-3"}>Antaliya
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg2})` }}
                        className={"card p-3 border-0 shadow-sm text-orange-400 col-start-3 col-end-4"}>
                        <Link className="text-decoration-none text-white" to="/video/1">Turkey</Link>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default Home