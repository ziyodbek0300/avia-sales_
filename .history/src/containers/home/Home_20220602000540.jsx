import React from 'react'
import bgImg from '../../static/images/backend.jpeg';
import bgImg2 from '../../static/images/frontend.jpeg';
import bgImg3 from '../../static/images/graphic.jpeg';
import bgImg4 from '../../static/images/smm.jpeg';
import bgImg5 from '../../static/images/marketing.jpeg';
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <Container className={"pb-5"}>
                <div className={"main-courses fw-bold fs-4"}>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg})` }}
                        className={"card p-3 border-0 shadow-sm"}>Back End
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg2})` }}
                        className={"card p-3 border-0 shadow-sm"}><Link className="text-decoration-none text-white" to="/video/1">Front End</Link></div>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg4})` }}
                        className={"card p-3 border-0 shadow-sm"}>Social Media Marketing
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg3})` }}
                        className={"card p-3 border-0 shadow-sm"}>Graphic Design
                    </div>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${bgImg5})` }}
                        className={"card p-3 border-0 shadow-sm"}>Digital Marketing
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home