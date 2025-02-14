import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loading from "../../../Components/Loading";
import { Helmet } from "react-helmet-async";

const AllDonationRequestsVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filter, setFilter] = useState("all");

  // Fetch donation requests
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["donationRequests", user.email, currentPage, filter],
    queryFn: async () => {
      const response = await axios.get(
        `https://blood-link-server-five.vercel.app/all-donation-requests`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            filter: filter === "all" ? undefined : filter,
          },
        }
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `https://blood-link-server-five.vercel.app/donation-requests/${requestId}/status`,
        { status: newStatus }
      );
      toast.success("Donation status has been updated!");
      refetch();
    } catch (error) {
      {
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  // Handle undefined data
  const { requests = [], totalPages = 1 } = data || {};

  return (
    <div className="lg:ml-64 lg:p-6 flex flex-col items-center">
      <Helmet>
        <title>All Donation Requests | Blood Link</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Blood Donation Requests
      </h1>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter by status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto w-[340px] md:w-auto">
        <table className="w-full table-auto border-collapse bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Recipient Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Date & Time</th>
              <th className="py-2 px-4 border-b">Blood Group</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {requests.length > 0 ? (
              requests.map((donation) => (
                <tr key={donation._id}>
                  <td className="py-2 px-4 border-b">
                    {donation.recipientName}
                  </td>
                  <td className="py-2 px-4 border-b">{`${donation.recipientDistrict}, ${donation.recipientUpazila}`}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(donation.donationDate)} at{" "}
                    {donation.donationTime}
                  </td>
                  <td className="py-2 px-4 border-b">{donation.bloodGroup}</td>
                  <td className="py-2 px-4 border-b">
                    {donation.donationStatus}
                    {donation.donationStatus === "inprogress" && (
                      <div className="mt-2 flex">
                        <button
                          onClick={() =>
                            handleStatusChange(donation._id, "done")
                          }
                          className="btn btn-sm bg-red-900 hover:bg-red-700 text-white rounded-lg"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(donation._id, "canceled")
                          }
                          className="btn btn-sm bg-slate-400 hover:bg-white text-black rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-red-900 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonationRequestsVolunteer;
