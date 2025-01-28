import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Loading from "../../../Components/Loading";
import AllDonationRequests from "../AdminDashboard/AllDonationRequests";
import AllDonationRequestsVolunteer from "../VolunteerDashboard/AllDonationRequestsVolunteer";
import { Navigate } from "react-router-dom";

const AllDonationWrapper = () => {
  const { user } = useContext(AuthContext);

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await axios.get(
        `https://blood-link-server-five.vercel.app/users/${user.email}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  switch (userInfo.role) {
    case "admin":
      return <AllDonationRequests></AllDonationRequests>;
      break;

    case "volunteer":
      return <AllDonationRequestsVolunteer></AllDonationRequestsVolunteer>;
      break;
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default AllDonationWrapper;
