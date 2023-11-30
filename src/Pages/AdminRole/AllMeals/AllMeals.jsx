import { useState } from "react";
import AllMealsRow from "./AllMealsRow";
import useMenu from "../../../hooks/useMenu";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

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

export default AllMeals;
