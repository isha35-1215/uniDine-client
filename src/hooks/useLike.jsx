
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLike = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: like = [] } = useQuery({
        queryKey: ['like'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/meals/${_id}`);
            return res.data;
        }
    })

    return [like, refetch]
};

export default useLike;