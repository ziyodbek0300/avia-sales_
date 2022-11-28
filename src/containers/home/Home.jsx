import React from "react";
import "rsuite/dist/rsuite.css";
import {Outlet} from "react-router-dom";

function Home() {

    return (<div>
        <Outlet/>
    </div>);
}

export default Home;
