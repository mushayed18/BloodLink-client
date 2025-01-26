import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch the user data based on the logged-in user's email
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/users/${user.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Conditional navigation links based on user role
  const adminNavlinks = (
    <>
      <nav className="mt-4">
        <ul className="space-y-0">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
                  isActive ? "bg-red-950" : ""
                }`
              }
            >
              Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
                  isActive ? "bg-red-950" : ""
                }`
              }
            >
              All users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-blood-donation-request"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
                  isActive ? "bg-red-950" : ""
                }`
              }
            >
              All donation requests
            </NavLink>
          </li>
          {/* Add more admin-specific links here */}
        </ul>
      </nav>
    </>
  );

  const volunteerNavlinks = (
    <>
      <nav className="mt-4">
        <ul className="space-y-0">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
                  isActive ? "bg-red-950" : ""
                }`
              }
            >
              Dashboard Home
            </NavLink>
          </li>
          {/* Add more volunteer-specific links here */}
        </ul>
      </nav>
    </>
  );

  const donorNavlinks = (
    <>
      <nav className="mt-4">
        <ul className="space-y-0">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
                  isActive ? "bg-red-950 text-white" : ""
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
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
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
                `block px-4 py-2 hover:bg-red-700 text-black hover:text-white ${
                  isActive ? "bg-red-900" : ""
                }`
              }
            >
              Create Donation Request
            </NavLink>
          </li>
          {/* Add more donor-specific links here */}
        </ul>
      </nav>
    </>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data.</div>;
  }

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

        {/* Conditional rendering of navlinks based on the role */}
        {userData?.role === "admin"
          ? adminNavlinks
          : userData?.role === "volunteer"
          ? volunteerNavlinks
          : donorNavlinks}

        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-red-700 hover:text-white text-black ${
                  isActive ? "bg-red-900" : ""
                }`
              }
            >
              Back Home
            </NavLink>
          </li>
        </ul>
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
