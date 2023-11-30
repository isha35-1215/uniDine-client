import { useEffect, useState } from "react";
import UpcomingRow from "./UpcomingRow";

const UpcomingMeals = () => {


    const [allNew, setAllNew] = useState([]);
    console.log(allNew);

    useEffect(() => {
        fetch(`https://uni-dine-server.vercel.app/upcomings`)
            .then((res) => res.json())
            .then((data) => setAllNew(data));
    }, []);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAllNew = allNew.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(allNew.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    
   


    return (
        <div>
            <h1 className="py-8 text-5xl text-center font-bold">Upcoming Items: {allNew.length}</h1>
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
                            <UpcomingRow key={item._id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center my-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-orange-500 rounded-xl shadow-lg btn btn-warning text-white px-4 py-2 mx-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-orange-500 rounded-xl shadow-lg btn btn-warning text-white px-4 py-2 mx-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UpcomingMeals;
