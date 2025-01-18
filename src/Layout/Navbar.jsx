import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useContext, useState } from "react";
import logo from "../../public/logo.png";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOutUser, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const navbar = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Donation Requests</NavLink>
      <NavLink to="/">Blog</NavLink>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b-2 bg-white">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RxCross1 size={24} /> : <FaBars size={24} />}
          </div>
          <div className="">
            <img className="h-24 w-32" src={logo} alt="logo" />
          </div>
        </div>

        <div className="lg:flex gap-8 font-semi tracking-wider hidden">
          {navbar}
        </div>

        {(user && user?.email) || loading === true ? (
          <div className="flex gap-2 items-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-lg z-[1]"
              >
                <button
                  onClick={signOutUser}
                  className="btn bg-sky-500 text-black hover:bg-sky-300"
                >
                  logout
                </button>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              onClick={handleLogin}
              className="btn btn-sm rounded-none bg-red-700 text-white hover:bg-red-300"
            >
              Login
            </button>
          </div>
        )}

        <div
          className={`fixed top-0 left-0 h-full shadow-lg z-50 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 w-4/5 backdrop-blur-lg bg-white/30 text-black`}
        >
          <div className="pl-5">
            <div className="flex items-center mb-6 gap-2 border-b-2">
              <div
                className="cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <RxCross1 size={24} />
              </div>
              <div className="">
                <img className="h-24 w-32" src={logo} alt="logo" />
              </div>
            </div>
            <nav className="flex flex-col gap-4">{navbar}</nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
