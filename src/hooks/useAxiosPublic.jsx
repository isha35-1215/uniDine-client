import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://uni-dine-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;