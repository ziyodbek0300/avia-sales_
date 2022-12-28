import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./containers/about/About";
import ForPartners from "./containers/forPartners";
import Home from "./containers/home/Home";
import Where from "./containers/where";
import { userRole } from "./constants/userRole";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { getMe } from "./redux/user/actions";
import AgentIndex from "./containers/agentIndex";
import "react-toastify/dist/ReactToastify.css";
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
import HotelOrder from "./containers/hotelOrder";
import Result from "./containers/details/Result";
import Transfers from "./containers/transfers";
import VisaDetails from "./containers/details/VisaDetails";
import Visas from "./containers/visas";
import ExcursionTour from "./containers/details/ExcursionTour";
import FlightsResult from "./containers/details/FlightsResult";
import TourPack from "./containers/home/TabSections/TourPack";
import ExcursionTours from "./containers/home/TabSections/ExcursionTours";
import Hotels from "./containers/home/TabSections/Hotels";
import TransfersTab from "./containers/home/TabSections/Transfers";
import VisasTab from "./containers/home/TabSections/Visas";
import FlightsTab from "./containers/home/TabSections/Flights";
import ExTourResult from "./containers/details/ExTourResult";
import ExTourList from "./containers/exTourList/ExTourList";
import VisaResult from "./containers/details/VisaResult";
import TourList from "./containers/tourpacks-list/TourPacksList";
import TourResult from "./containers/details/TourResult";
import HotelsOrder from "./containers/hotelOrderr";
import HotelResult from "./containers/details/HotelResult";
import HotelOrders from "./containers/hotel-orders/HotelOrders";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);

  useLayoutEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : users?.role === userRole.client ||
        !users?.role ||
        users.role === userRole.agent ? (
        <div className="flex flex-col min-h-screen justify-between">
          <div>
            <Navbar />
            <Routes>
              <Route path={"/"} element={<Home />}>
                <Route element={<TourPack />} path={"/"} />
                <Route element={<FlightsTab />} path={"tab-flights"} />
                <Route element={<ExcursionTours />} path={"tab-ex-tours"} />
                <Route element={<Hotels />} path={"tab-hotels"} />
                <Route element={<VisasTab />} path={"tab-visas"} />
                <Route element={<TransfersTab />} path={"tab-transfers"} />
              </Route>
              <Route path="/about-us" element={<About />} />
              <Route path="/where-are-we" element={<Where />} />
              <Route path="/for-partners" element={<ForPartners />} />
              <Route path="/details/:id" element={<Details />} />
              <Route
                path="/transferDetails/:id"
                element={<TransfersDetail />}
              />
              <Route path="/transferDetails/result/:id" element={<Result />} />
              <Route path="visaDetails/:id" element={<VisaDetails />} />
              <Route path="/details/result/:id" element={<FlightsResult />} />
              <Route path="/details/visaResult/:id" element={<VisaResult />} />
              <Route path="/details/tourResult/:id" element={<TourResult />} />
              <Route path="/details/hotelResult/:id" element={<HotelResult />} />
              <Route
                path="/details/exTourResult/:id"
                element={<ExTourResult />}
              />
              <Route path="/excursion/:id" element={<ExcursionTour />} />
              <Route
                path="tourPack/order/:hotelId/:id"
                element={<HotelOrder />}
              />
              <Route
                path="hotel/order/:hotelId/:id"
                element={<HotelsOrder />}
              />
              <Route path="/tour-package-order" element={<TourList />} />
              <Route path="/hotel-orders" element={<HotelOrders />} />
              <Route
                path="/tour-packet/order/:hotelId/:roomId/:isGroup"
                element={<HotelOrder />}
              />
              {users?.role === userRole.agent ? (
                <>
                  <Route path={"/my"} element={<AgentIndex/>}>
                    <Route path="about-us" element={<About />} />
                    <Route path="where-are-we" element={<Where />} />
                    <Route path="for-partners" element={<ForPartners />} />
                  </Route>
                </>
              ) : null}
            </Routes>
          </div>
          <Footer />
        </div>
      ) : users?.role === userRole.admin ? (
        <div className="flex flex-col min-h-screen justify-between">
          <div>
            <Navbar />
            <Routes>
              <Route path={"/"} element={<Home />}>
                <Route element={<TourPack />} path={"/"} />
                <Route element={<FlightsTab />} path={"tab-flights"} />
                <Route element={<ExcursionTours />} path={"tab-ex-tours"} />
                <Route element={<Hotels />} path={"tab-hotels"} />
                <Route element={<VisasTab />} path={"tab-visas"} />
                <Route element={<TransfersTab />} path={"tab-transfers"} />
              </Route>
              <Route path="/about-us" element={<About />} />
              <Route path="/where-are-we" element={<Where />} />
              <Route path="/for-partners" element={<ForPartners />} />
              <Route path="/details/:id" element={<Details />} />
              <Route
                path="/transferDetails/:id"
                element={<TransfersDetail />}
              />
              <Route
                  path="hotel/order/:hotelId/:id"
                  element={<HotelsOrder />}
              />
              <Route path="/transferDetails/result/:id" element={<Result />} />
              <Route path="/details/result/:id" element={<FlightsResult />} />
              <Route path="/details/visaResult/:id" element={<VisaResult />} />
              <Route path="/details/tourResult/:id" element={<TourResult />} />
              <Route path="/details/hotelResult/:id" element={<HotelResult />} />
              <Route
                path="/details/exTourResult/:id"
                element={<ExTourResult />}
              />
              <Route
                path="/tour-packet/order/:hotelId/:roomId"
                element={<HotelOrder />}
              />
              <Route
                path="/tour-packet/order/:hotelId/:roomId"
                element={<HotelOrder />}
              />
              <Route
                path="tourPack/order/:hotelId/:id"
                element={<HotelOrder />}
              />
              <Route path="/excursion/:id" element={<ExcursionTour />} />
              <Route path={"/"} element={<AdminNavbar />}>
                <Route path={"/"} element={<Navigate to={"/users"} />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="tour-package" element={<TourPackage />} />
                <Route path="finance" element={<Finnance />} />
                <Route path="partners" element={<AdminParners />} />
                <Route path="partners/orders/:id" element={<PartnerOrders />} />
                <Route path="exTourList" element={<ExTourList />} />
                <Route path="avia-tickets" element={<Aviaticket />} />
                <Route path="where-are-we" element={<Where />} />
                <Route path="for-partners" element={<ForPartners />} />
                <Route path="regions" element={<Regions />} />
                <Route path="/transfersList" element={<Transfers />} />
                <Route path="flights" element={<Flights />} />
                <Route path="/visasList" element={<Visas />} />
                <Route path="/tour-package-order" element={<TourList />} />
                <Route path="/hotel-orders" element={<HotelOrders />} />
                <Route path="visaDetails/:id" element={<VisaDetails />} />
                <Route path={"*"} element={<div>Not found</div>} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default App;
