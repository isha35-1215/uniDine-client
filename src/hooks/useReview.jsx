import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Pages/Providers/AuthProvider/AuthProvider";

const useReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext)
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews?email=${user.email}`);
            return res.data;
        }
    })

    return [review, refetch]
};

export default useReview;