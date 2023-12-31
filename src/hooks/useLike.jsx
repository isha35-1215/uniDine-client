import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Pages/Providers/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router-dom";

const useLike = () => {
    const {id}= useParams();

    console.log(id);
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: like = [] } = useQuery({
        queryKey: ['like', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/likes?email=${user?.email}&id=${id}`);
            return res.data;
        }
    })

    return [like, refetch]
};

export default useLike;