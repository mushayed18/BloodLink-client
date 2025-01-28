import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";

const PrivateDonor = ({ children }) => {
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

  if (
    userInfo.role === "donor" ||
    userInfo.role === "admin" ||
    userInfo.role === "volunteer"
  ) {
    return React.cloneElement(children, { userInfo });
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateDonor;
