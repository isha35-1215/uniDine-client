import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUpcoming = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: upcoming = [] } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/upcomings`);
            return res.data;
        }
    })

    return [upcoming, refetch]
};

export default useUpcoming;