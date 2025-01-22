import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Loading from "../../../Components/Loading";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import VolunteerDashboard from "../VolunteerDashboard/VolunteerDashboard";

const DashboardWrapper = () => {
    const {user} = useContext(AuthContext);

    const {data: userInfo, isLoading} = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/users/${user.email}`)
            return response.data
        }
    })

    if(isLoading) {
        return <Loading></Loading>
    }

    switch (userInfo.role) {
        case 'admin':
            return <AdminDashboard userInfo={userInfo}></AdminDashboard>
            break;
    
        case 'donor':
            return <DonorDashboard userInfo={userInfo}></DonorDashboard>
            break;
    
        case 'volunteer':
            return <VolunteerDashboard userInfo={userInfo}></VolunteerDashboard>
            break;
    }
};

export default DashboardWrapper;