import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const DonationRequestDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [donationStatus, setDonationStatus] = useState(null);
  const navigate = useNavigate();

  // Use useParams to get the ID from the route
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/donation-request/${id}`
      );
      return response.data;
    },
  });

  const handleDonate = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/donation-requests/${id}/status`,
        {
          status: "inprogress",
          donorName: user?.displayName,
          donorEmail: user?.email,
        }
      );
      toast.success("You successfully donated!");
      setDonationStatus("inprogress");
      setIsModalOpen(false);
      navigate("/blood-donation-requests");
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Donation request not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:p-6 mt-20 flex items-center justify-center">
      <Helmet>
        <title>Donation Requests Details | Blood Link</title>
      </Helmet>
      <div className="my-8 md:my-0 border-2 rounded-lg p-10 md:p-20 w-11/12 lg:w-1/2">
        <h1 className="text-center text-3xl font-bold mb-6">
          Donation Request Details
        </h1>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Recipient Info</h2>
            <p>Name: {data.recipientName}</p>
            <p>
              Location: {data.recipientDistrict}, {data.recipientUpazila}
            </p>
            <p>Hospital: {data.hospitalName}</p>
            <p>Address: {data.fullAddress}</p>
            <p>Blood Group: {data.bloodGroup}</p>
            <p>Donation Date: {data.donationDate}</p>
            <p>Donation Time: {data.donationTime}</p>
            <p>Request Message: {data.requestMessage}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Requester Info</h2>
            <p>{data.requesterName}</p>
            <p>{data.requesterEmail}</p>
            <img
              src={data.requesterImage}
              alt={data.requesterName}
              className="mt-2 w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full hover:bg-red-700 bg-red-900 text-white px-6 py-2 rounded-none"
        >
          Donate
        </button>
      </div>

      {/* Modal for Donation Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/3">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-center">
                Confirm Donation
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm text-right hover:bg-gray-600 bg-gray-400"
              >
                X
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Donor Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleDonate}
                  className="btn rounded-none hover:bg-red-700 bg-red-900 text-white px-4 py-2"
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
