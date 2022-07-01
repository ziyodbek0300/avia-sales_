import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./containers/about/About";
import Home from "./containers/home/Home";
import Where from "./containers/where";
import {useTranslation} from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();
    console.log(t("uz"))
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/where-are-we" element={<Where />} />
      </Routes>
    </div>
  );
}

export default App;