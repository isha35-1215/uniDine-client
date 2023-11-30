import { useEffect, useState } from "react";
import UpcomingRow from "./UpcomingRow";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import useUpcoming from "../../../hooks/useupcoming";

const UpcomingMeals = () => {

    const [upcoming, refetch] = useUpcoming();

    // const [allnew, setAllNew] = useState([]);
    // console.log(allNew);

    // useEffect(() => {
    //     fetch(`https://uni-dine-server.vercel.app/upcomings`)
    //         .then((res) => res.json())
    //         .then((data) => setAllNew(data));
    // }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAllNew = upcoming.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(upcoming.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    
   


    return (
        <div>
            <h1 className="py-8 text-5xl text-center font-bold">Upcoming Items: {upcoming.length}</h1>
            <div className="overflow-x-auto mx-6 table-container" style={{ minHeight: "400px" }}>
                <table className="table">
                    {/* Head */}
                    <thead>
                        <tr className="grid grid-cols-7 text-xl font-extrabold text-black">
                            <th>Image</th>
                            <th className="col-span-3">Title</th>
                            <th>Likes</th>
                            <th>Add Meal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAllNew.map((item) => (
                            <UpcomingRow key={item._id} item={item} refetch={refetch} />
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

export default UpcomingMeals;
