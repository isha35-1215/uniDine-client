import { useState } from "react";
import AllUsers from "../../../../hooks/AllUsers";
import ManageRow from "../ManageUserRow/ManageRow";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const ManageUsers = () => {
    const [users, refetch] = AllUsers();
    // const [isOne, setIsOne] = useState([]);
    // const [cards, setCards] = useState([]);
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

    // const [searchInput, setSearchInput] = useState('');

    // useEffect(() => {
    //     // Filter by search input
    //     let filteredData = users.filter((user) =>
    //         user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    //         user.email.toLowerCase().includes(searchInput.toLowerCase())
    //     );
    
    //     // Fetch isOne data for each user asynchronously
    //     Promise.all(filteredData.map((user) =>
    //         fetch(`https://uni-dine-server.vercel.app/isOne?email=${user.email}&name=${user.name}`)
    //             .then((res) => res.json())
    //     ))
    //         .then((data) => setIsOne(data))
    //         .catch((error) => console.error("Error fetching isOne data:", error));
    
    //     setCards(filteredData);
    // }, [searchInput, users]); // Include searchInput and users as dependencies
    

    // console.log(searchInput);

    return (
        <div>
            <h1 className="py-6 text-5xl text-center font-bold">Total User: {users.length}</h1>
            <div className="input-group flex w-72 mx-auto my-4">
                <input
                    type="text"
                    placeholder="Search by email and name..."
                    className="input input-bordered border-orange-500 rounded-r-none"
                // value={searchInput}
                // onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-secondary bg-orange-500 rounded-l-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
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
                            <ManageRow key={item._id} user={item}  refetch={refetch} />
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

export default ManageUsers;
