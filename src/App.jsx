import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import "animate.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
