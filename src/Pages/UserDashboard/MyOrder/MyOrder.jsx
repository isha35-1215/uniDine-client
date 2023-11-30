import { useState } from "react";
import useOrder from "../../../hooks/useOrder";
import MyOrderRow from "./MyOrderRow";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const MyOrder = () => {
    const [orders, refetch] = useOrder();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = orders.slice(startIndex, endIndex);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <h1 className="text-4xl my-10 font-extrabold text-center">
                My Orders: {orders.length}
            </h1>
            <div className="overflow-x-auto mx-6 table-container" style={{ minHeight: "400px" }}>
                <table className="table">
                    {/* Head */}
                    <thead>
                        <tr className="grid grid-cols-6 text-xl font-extrabold text-black">
                            <th className="col-span-2">Title</th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <MyOrderRow
                                key={order._id}
                                order={order}
                                refetch={refetch}
                            ></MyOrderRow>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center my-4">
                <GrFormPreviousLink
                    className={`text-2xl ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 cursor-pointer'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                />

                <span className="mx-4">
                    Page {currentPage} of {totalPages}
                </span>

                <GrFormNextLink
                    className={`text-2xl ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 cursor-pointer'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
                />
            </div>
        </div>
    );
};

export default MyOrder;
