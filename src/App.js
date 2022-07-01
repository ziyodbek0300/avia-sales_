import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./containers/about/About";
import ForPartners from "./containers/forPartners";
import Home from "./containers/home/Home";
import Where from "./containers/where";
import { useTranslation } from "react-i18next";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/where-are-we" element={<Where />} />
        <Route path="/for-partners" element={<ForPartners />} />
      </Routes>
    </div>
  );
}

export default App;