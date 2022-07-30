import React from "react";
import "rsuite/dist/rsuite.css";
import BestStates from "./BestStates";
import AllStates from "./AllStates";
import LastSection from "./LastSection";
import TabsL from "./TabsL";

function Home() {
    return (
        <div>
            <TabsL />
            <BestStates />
            <AllStates />
            <LastSection />
        </div>
    );
}

export default Home;
