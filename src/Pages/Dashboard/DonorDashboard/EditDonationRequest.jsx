import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: donationRequest, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/donation-request/${id}`
      );
      return response.data;
    },
  });

  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  useEffect(() => {
    if (donationRequest) {
      setFormData(donationRequest);
    }
  }, [donationRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Extract `_id` from formData and create a new object without it
    const { _id, ...updatedData } = formData;
  
    console.log("Updated data being sent:", updatedData); // Verify that _id is not included
  
    try {
      const response = await axios.put(
        `http://localhost:5000/donation-requests/${id}`,
        updatedData // Send updated data without _id
      );
      if (response.status === 200) {
        toast.success("Donation request updated successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Failed to update donation request. Please try again.");
    }
  };
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="lg:ml-64 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Edit Donation Request
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Requester Name
          </label>
          <input
            type="text"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Requester Email
          </label>
          <input
            type="email"
            name="requesterEmail"
            value={formData.requesterEmail}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Recipient District
          </label>
          <input
            type="text"
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Recipient Upazila
          </label>
          <input
            type="text"
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Hospital Name
          </label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Full Address
          </label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blood Group
          </label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Donation Date
          </label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Donation Time
          </label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Request Message
          </label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn bg-red-900 rounded-none text-white hover:bg-red-700"
        >
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
