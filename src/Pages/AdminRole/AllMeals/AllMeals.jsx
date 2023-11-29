import { useState } from "react";
import AllMealsRow from "./AllMealsRow";
import useMenu from "../../../hooks/useMenu";

const AllMeals = () => {
  const [meals, refetch] = useMenu();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeals = meals.slice(startIndex, endIndex);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2 className="text-4xl my-11 font-extrabold text-center">
        All Meals: {meals.length}
      </h2>
      <div className="overflow-x-auto table-container" style={{ minHeight: "400px" }}>
        <table className="table">
          {/* Head */}
          <thead>
            <tr className="grid grid-cols-11 text-lg font-extrabold text-black">
              <th className="col-span-2">Title</th>
              <th>Likes</th>
              <th>Review</th>
              <th className="col-span-2">Distributor</th>
              <th className="col-span-2">Email</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {currentMeals.map((item) => (
              <AllMealsRow key={item._id} item={item} refetch={refetch}></AllMealsRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-orange-500 shadow-xl rounded-xl btn btn-warning text-white px-4 py-2 mx-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-orange-500 shadow-xl rounded-xl btn btn-warning text-white px-4 py-2 mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllMeals;
