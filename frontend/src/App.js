import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Register from "./components/Register/Register.js";
import Edit from "./components/Edit/Edit.js";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail/Detail.js";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
