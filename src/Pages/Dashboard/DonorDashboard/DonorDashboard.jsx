import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";

const DonorDashboard = ({ userInfo }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const {
    data: recentDonations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recentDonations", userInfo.email],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/donation-requests/${userInfo.email}`
      );
      return response.data;
    },
  });

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/donation-requests/${requestId}/status`, // Use PATCH instead of PUT
        {
          status: newStatus, // Pass status as 'status' key, which is expected in backend
        }
      );
      refetch(); // Refetch the data after updating
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/donation-requests/${requestId}`
          );
          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success"
          );
          refetch(); // Refresh the recent donations
        } catch (error) {
          Swal.fire(
            "Error!",
            "Failed to delete donation request. Try again later.",
            "error"
          );
        }
      }
    });
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

  return (
    <div className="p-6 lg:ml-64">
      <h1 className="text-3xl font-bold mb-6">Welcome, {userInfo.name}!</h1>

      {recentDonations && recentDonations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Your Recent Donation Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="text-center table bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.slice(0, 3).map((donation) => (
                  <tr key={donation._id}>
                    <td>
                      {donation.recipientName}
                    </td>
                    <td>{`${donation.recipientDistrict}, ${donation.recipientUpazila}`}</td>
                    <td>
                      {formatDate(donation.donationDate)} at{" "}
                      {donation.donationTime}
                    </td>
                    <td>
                      {donation.bloodGroup}
                    </td>
                    <td>
                      {donation.donationStatus}
                      {donation.donationStatus === "inprogress" && (
                        <div className="mt-2 flex">
                          <button
                            onClick={() =>
                              handleStatusChange(donation._id, "done")
                            }
                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(donation._id, "canceled")
                            }
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="flex flex-col gap-2">
                      <Link
                        to={`/dashboard/edit-my-donation-request/${donation._id}`}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-center"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(donation._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2 text-center"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/dashboard/view-my-donation-request/${donation._id}`}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 text-center"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link
        to="/dashboard/my-donation-requests"
        className="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        View All My Requests
      </Link>
    </div>
  );
};

export default DonorDashboard;
