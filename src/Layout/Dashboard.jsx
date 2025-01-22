import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`fixed z-20 bg-slate-200 text-black h-full w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="mt-4">
          <ul className="space-y-0">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-red-700 text-white ${
                    isActive ? "bg-red-950" : ""
                  }`
                }
              >
                Dashboard Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-red-700 text-white ${
                    isActive ? "bg-red-900" : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/create-donation-request"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-red-700 text-white ${
                    isActive ? "bg-red-900" : ""
                  }`
                }
              >
                Create Donation Request
              </NavLink>
            </li>
            {/* Add more dashboard links here */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Mobile Menu Toggle */}
        <header className="bg-white shadow p-4 lg:hidden flex items-center justify-between">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="text-gray-800 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </header>

        {/* Content Area */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
