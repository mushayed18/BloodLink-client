import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = ({ userInfo }) => {
  const [upazilas, setUpazilas] = useState([]);

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await axios.get("/districts.json");
      return response.data[2]?.data || [];
    },
  });

  const { data: upazilaData = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const response = await axios.get("/upazilas.json");
      return response.data[2]?.data || [];
    },
  });

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    requesterImage: userInfo.photo,
  });

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const filteredUpazilas = upazilaData.filter(
      (u) => u.district_id === selectedDistrictId
    );
    setUpazilas(filteredUpazilas);

    setFormData({
      ...formData,
      recipientDistrict: selectedDistrictId,
      recipientUpazila: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the district name based on the selected ID
    const selectedDistrict = districts.find(
      (district) => district.id === formData.recipientDistrict
    );

    const requestData = {
      requesterName: userInfo.name,
      requesterEmail: userInfo.email,
      ...formData,
      recipientDistrict: selectedDistrict?.name || "", // Use the name, fallback to empty if not found
      donationStatus: "pending",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/donation-requests",
        requestData
      );
      if (response.data.success) {
        toast.success("Donation request created successfully!");
        setFormData({
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
      }
    } catch (error) {
      console.error("Error creating donation request:", error);
      toast.error("Failed to create donation request. Please try again.");
    }
  };

  return (
    <>
      {userInfo.status === "blocked" ? (
        <div className="min-h-screen lg:ml-64 flex items-center justify-center">
          <p className="text-center font-bold text-3xl">
            You don't have the permission to create any donation request! Please
            contact with the admin.
          </p>
        </div>
      ) : (
        <div className="lg:ml-64 p-6 bg-white shadow-md rounded-md">
          <h1 className="font-bold text-4xl py-10 text-center">
            Create Donation Request
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Requester Name
              </label>
              <input
                type="text"
                value={userInfo.name}
                readOnly
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Requester Email
              </label>
              <input
                type="email"
                value={userInfo.email}
                readOnly
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Recipient District
              </label>
              <select
                name="recipientDistrict"
                value={formData.recipientDistrict}
                onChange={handleDistrictChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Recipient Upazila
              </label>
              <select
                name="recipientUpazila"
                value={formData.recipientUpazila}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Full Address</label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Donation Date</label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Donation Time</label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Request Message
              </label>
              <textarea
                name="requestMessage"
                value={formData.requestMessage}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-700"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateDonationRequest;
