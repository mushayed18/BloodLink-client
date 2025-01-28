import React from "react";
import { FaUserFriends, FaTint } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Loading from "../../../Components/Loading";

const SharedDashboardHome = ({ userInfo }) => {
  // Fetch total donors
  const { data: totalDonors = 0, isLoading: donorsLoading } = useQuery({
    queryKey: ["totalDonors"],
    queryFn: async () => {
      const response = await axios.get(
        "https://blood-link-server-five.vercel.app/total-donors"
      );
      return response.data.total;
    },
  });

  // Fetch total blood donation requests
  const { data: totalRequests = 0, isLoading: requestsLoading } = useQuery({
    queryKey: ["totalRequests"],
    queryFn: async () => {
      const response = await axios.get(
        "https://blood-link-server-five.vercel.app/total-donation-requests"
      );
      return response.data.total;
    },
  });

  return (
    <div className="md:p-6 lg:ml-64">
      <Helmet>
        <title>Dashboard Home | Blood Link</title>
      </Helmet>
      <div className="text-2xl font-bold mb-6 text-center">
        Welcome, {userInfo.name}!
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center h-36">
          <FaUserFriends className="text-red-900 text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Total Donors</h3>
            {donorsLoading ? (
              <Loading></Loading>
            ) : (
              <p className="text-xl font-semibold">{totalDonors}</p>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center h-36">
          <FaTint className="text-red-900 text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Blood Requests</h3>
            {requestsLoading ? (
              <Loading></Loading>
            ) : (
              <p className="text-xl font-semibold">{totalRequests}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedDashboardHome;
