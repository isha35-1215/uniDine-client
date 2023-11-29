import { useState } from "react";
import AllUsers from "../../../../hooks/AllUsers";
import ManageRow from "../ManageUserRow/ManageRow";

const ManageUsers = () => {
    const [users, refetch] = AllUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    

    return (
        <div>
            <h1 className="py-8 text-5xl text-center font-bold">Total User: {users.length}</h1>
            <div className="overflow-x-auto mx-6 table-container" style={{ minHeight: "400px" }}>
                <table className="table">
                    {/* Head */}
                    <thead>
                        <tr className="grid grid-cols-4 text-xl font-extrabold text-black">
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Membership</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((item) => (
                            <ManageRow key={item._id} user={item} refetch={refetch} />
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

export default ManageUsers;
