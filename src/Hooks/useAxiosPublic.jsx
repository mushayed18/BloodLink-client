import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://blood-link-server-five.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;