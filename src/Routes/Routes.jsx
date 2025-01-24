import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import DashboardWrapper from "../Pages/Dashboard/DashboardWrapper/DashboardWrapper";
import CreateDonationRequest from "../Pages/Dashboard/DonorDashboard/CreateDonationRequest";
import PrivateDonor from "./PrivateDonor";
import MyDonationRequests from "../Pages/Dashboard/DonorDashboard/MyDonationRequests";
import ViewDonationRequest from "../Pages/Dashboard/DonorDashboard/ViewDonationRequest";
import EditDonationRequest from "../Pages/Dashboard/DonorDashboard/EditDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardWrapper></DashboardWrapper></PrivateRoute>
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <PrivateRoute><PrivateDonor><CreateDonationRequest></CreateDonationRequest></PrivateDonor></PrivateRoute>,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <PrivateRoute><PrivateDonor><MyDonationRequests /></PrivateDonor></PrivateRoute>
      },
      {
        path: "/dashboard/view-my-donation-request/:id",
        element: <PrivateRoute><ViewDonationRequest></ViewDonationRequest></PrivateRoute>
      },
      {
        path: "/dashboard/edit-my-donation-request/:id",
        element: <PrivateRoute><EditDonationRequest></EditDonationRequest></PrivateRoute>
      },
    ]
  }
]);
