import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Loading from "../../../Components/Loading";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import SharedDashboardHome from "../SharedDashboardHome/SharedDashboardHome";

const DashboardWrapper = () => {
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
      return <SharedDashboardHome userInfo={userInfo}></SharedDashboardHome>;
      break;

    case "donor":
      return <DonorDashboard userInfo={userInfo}></DonorDashboard>;
      break;

    case "volunteer":
      return <SharedDashboardHome userInfo={userInfo}></SharedDashboardHome>;
      break;
  }
};

export default DashboardWrapper;
