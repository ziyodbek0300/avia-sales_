import {Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./containers/about/About";
import ForPartners from "./containers/forPartners";
import Home from "./containers/home/Home";
import Where from "./containers/where";
import {userRole} from "./constants/userRole";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useLayoutEffect} from "react";
import {getMe} from "./redux/user/actions";
import AgentIndex from "./containers/agentIndex";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./components/navbar/AdminNavbar";
import AdminUsers from "./containers/adminUsers";
import Footer from "./components/footer";
import Aviaticket from "./containers/aviaticket";
import TourPackage from "./containers/tourPackage";
import Finnance from "./containers/finnance";
import AdminParners from "./containers/adminParners";
import Regions from "./containers/regions";
import Flights from "./containers/flights";
import Details from "./containers/details";
import PartnerOrders from "./containers/partnerOrders";
import TransfersDetail from "./containers/details/TransfersDetail";

function App() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.currentUser)
    const loading = useSelector(state => state.user.loading)

    useLayoutEffect(() => {
        dispatch(getMe())
    }, [])


    return (
        <div>
            {loading ? (
                    <div>
                        loading...
                    </div>
                ) :
                (users?.role === userRole.client || !users?.role || users.role === userRole.agent) ? (
                        <div className="flex flex-col min-h-screen justify-between">
                            <div>
                                <Navbar/>
                                <Routes>
                                    <Route index element={<Home/>}/>
                                    <Route path="/about-us" element={<About/>}/>
                                    <Route path="/where-are-we" element={<Where/>}/>
                                    <Route path="/for-partners" element={<ForPartners/>}/>
                                    {(users?.role === userRole.agent) ? (
                                        <>
                                            <Route path={'/my'}>
                                                <Route index element={<AgentIndex/>}/>
                                                <Route path="about-us" element={<About/>}/>
                                                <Route path="where-are-we" element={<Where/>}/>
                                                <Route path="for-partners" element={<ForPartners/>}/>
                                            </Route>
                                        </>
                                    ) : null}
                                </Routes>
                            </div>
                            <Footer/>
                        </div>
                    )
                    : users?.role === userRole.admin ? (
                            <div className="flex flex-col min-h-screen justify-between">
                                <div>
                                    <Navbar/>
                                    <Routes>
                                        <Route index element={<Home/>}/>
                                        <Route path="/about-us" element={<About/>}/>
                                        <Route path="/where-are-we" element={<Where/>}/>
                                        <Route path="/for-partners" element={<ForPartners/>}/>
                                        <Route path="/details/:id" element={<Details/>}/>
                                        <Route path="/transfers-detail/:id" element={<TransfersDetail/>}/>
                                        <Route path={"/"} element={<AdminNavbar/>}>
                                            <Route path={"/"} element={<Navigate to={"/users"}/>}/>
                                            <Route path="users" element={<AdminUsers/>}/>
                                            <Route path="tour-package" element={<TourPackage/>}/>
                                            <Route path="finance" element={<Finnance/>}/>
                                            <Route path="partners" element={<AdminParners/>}/>
                                            <Route path="partners/orders/:id" element={<PartnerOrders/>}/>
                                            <Route path="avia-tickets" element={<Aviaticket/>}/>
                                            <Route path="where-are-we" element={<Where/>}/>
                                            <Route path="for-partners" element={<ForPartners/>}/>
                                            <Route path="regions" element={<Regions/>}/>
                                            <Route path="flights" element={<Flights/>}/>
                                            <Route path={"*"} element={<div>Not found</div>}/>
                                        </Route>
                                    </Routes>
                                </div>
                                <Footer/>
                            </div>
                        )
                        : null
            }
            <ToastContainer/>
        </div>
    );
}

export default App;
