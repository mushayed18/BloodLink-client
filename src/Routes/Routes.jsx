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
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../Pages/DonationRequests/DonationRequestDetails";
import SearchDonor from "../Pages/SearchDonor/SearchDonor";
import PrivateAdmin from "./PrivateAdmin";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers";
import PrivateSign from "./PrivateSign";
import AllDonationRequests from "../Pages/Dashboard/AdminDashboard/AllDonationRequests";
import ContentManagement from "../Pages/Dashboard/AdminDashboard/ContentManagement";
import AddBlog from "../Pages/Dashboard/AdminDashboard/AddBlog";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllDonationWrapper from "../Pages/Dashboard/AllDonationWrapper/AllDonationWrapper";
import PrivateVolunteer from "./PrivateVolunteer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <PrivateSign><Login></Login></PrivateSign>,
      },
      {
        path: "/register",
        element: <PrivateSign><Register></Register></PrivateSign>,
      },
      {
        path: "/blood-donation-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "/donation-request-details/:id",
        element: <PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>,
      },
      {
        path: "/search-donor",
        element: <SearchDonor></SearchDonor>,
      },
      {
        path: "/blogs",
        element: <Blog></Blog>,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails></BlogDetails>,
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

      // admin and volunteer related routes
      {
        path: "/dashboard/all-users",
        element: <PrivateRoute><PrivateAdmin><AllUsers></AllUsers></PrivateAdmin></PrivateRoute>
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <PrivateRoute><AllDonationWrapper></AllDonationWrapper></PrivateRoute>
      },
      {
        path: "/dashboard/content-management",
        element: <PrivateRoute><PrivateAdmin><ContentManagement></ContentManagement></PrivateAdmin></PrivateRoute>
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: <PrivateRoute><PrivateAdmin><AddBlog></AddBlog></PrivateAdmin></PrivateRoute>
      },


    ]
  }
]);
