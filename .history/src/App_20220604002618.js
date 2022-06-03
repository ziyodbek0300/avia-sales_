import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./containers/about/About";
import Home from "./containers/home/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;