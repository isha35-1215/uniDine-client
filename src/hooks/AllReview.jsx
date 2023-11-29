import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const AllReview = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/allreviews`);
            return res.data;
        }
    })

    return [review, refetch]
};

export default AllReview;