import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Loading";
import { Helmet } from "react-helmet-async";

const ViewDonationRequest = () => {
  const { id } = useParams();

  const { data: donationRequest, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/donation-request/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="lg:ml-64 p-6">
      <Helmet>
        <title>View Donation Requests | Blood Link</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Donation Request Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4"><strong className="text-gray-700">Requester Name:</strong> {donationRequest.requesterName}</p>
        <p className="mb-4"><strong className="text-gray-700">Requester Email:</strong> {donationRequest.requesterEmail}</p>
        <p className="mb-4"><strong className="text-gray-700">Recipient Name:</strong> {donationRequest.recipientName}</p>
        <p className="mb-4">
          <strong className="text-gray-700">Location:</strong> {donationRequest.recipientDistrict}, {donationRequest.recipientUpazila}
        </p>
        <p className="mb-4"><strong className="text-gray-700">Hospital Name:</strong> {donationRequest.hospitalName}</p>
        <p className="mb-4"><strong className="text-gray-700">Full Address:</strong> {donationRequest.fullAddress}</p>
        <p className="mb-4"><strong className="text-gray-700">Blood Group:</strong> {donationRequest.bloodGroup}</p>
        <p className="mb-4"><strong className="text-gray-700">Donation Date:</strong> {donationRequest.donationDate}</p>
        <p className="mb-4"><strong className="text-gray-700">Donation Time:</strong> {donationRequest.donationTime}</p>
        <p className="mb-4"><strong className="text-gray-700">Message:</strong> {donationRequest.requestMessage}</p>
        <p className="mb-4">
          <strong className="text-gray-700">Donation Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              donationRequest.donationStatus === "inprogress"
                ? "bg-blue-500"
                : donationRequest.donationStatus === "completed"
                ? "bg-green-500"
                : "bg-red-900"
            }`}
          >
            {donationRequest.donationStatus}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ViewDonationRequest;
