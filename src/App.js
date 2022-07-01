import {Route, Routes,Navigate} from "react-router-dom";
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
import AdminDashboard from "./containers/adminDashboard";
import AgentIndex from "./containers/agentIndex";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./components/navbar/AdminNavbar";
import AdminUsers from "./containers/adminUsers";

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
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
                (user?.role === userRole.client || !user?.role || user.role===userRole.agent) ? (
                        <>
                            <Navbar/>
                            <Routes>
                                <Route index element={<Home/>}/>
                                <Route path="/about-us" element={<About/>}/>
                                <Route path="/where-are-we" element={<Where/>}/>
                                <Route path="/for-partners" element={<ForPartners/>}/>
                                {(user?.role === userRole.agent) ? (
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
                        </>
                    )
                    : user?.role === userRole.admin ? (
                            <>
                                <>
                                    <Routes>
                                        <Route path={"/"} element={<AdminNavbar/>}>
                                            <Route path={"/"} element={<Navigate  to={"/dashboard"}/>}/>
                                            <Route path="dashboard" element={<AdminDashboard/>}/>
                                            <Route path="users" element={<AdminUsers/>}/>
                                            <Route path="where-are-we" element={<Where/>}/>
                                            <Route path="for-partners" element={<ForPartners/>}/>
                                            <Route path={"*"} element={<div>Not found</div>}/>
                                        </Route>
                                    </Routes>
                                </>
                            </>
                        )
                        : null
            }
            <ToastContainer/>
        </div>
    );
}

export default App;