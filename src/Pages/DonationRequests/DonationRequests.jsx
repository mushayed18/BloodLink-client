import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading";
import DonationCard from "./DonationCard";

const DonationRequests = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pendingDonationRequests"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/donation-requests-pending");
      return response.data.requests;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No pending donation requests found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-32 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Pending Blood Donation Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-20 gap-10">
        {data.map((request) => (
          <DonationCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
