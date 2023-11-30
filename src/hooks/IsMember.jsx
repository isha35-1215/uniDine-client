import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Pages/Providers/AuthProvider/AuthProvider";


const IsMember = () => {
    const {user} = useContext(AuthContext);
    const email = user?.email;
    const axiosSecure = useAxiosSecure();
    const { refetch, data: upcoming = [] } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async() => {
            const res = await axiosSecure.get(`payment?email=${email}`);
            return res.data;
        }
    })

    return [upcoming, refetch]
};

export default IsMember;