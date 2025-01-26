import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";

const PrivateVolunteer = ({children}) => {
    const {user} = useContext(AuthContext);

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/users/${user.email}`);
            return response.data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (userInfo.role === 'volunteer') {
        return React.cloneElement(children, { userInfo });
    }

    return <Navigate to={'/login'}></Navigate>
};

export default PrivateVolunteer;