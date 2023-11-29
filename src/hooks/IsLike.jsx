import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Pages/Providers/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const IsLike = () => {
    
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: isLiked = [] } = useQuery({
        queryKey: ['like', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/samelikes?email=${user?.email}`);
            return res.data;
        }
    })

    return [isLiked, refetch]
};

export default IsLike;