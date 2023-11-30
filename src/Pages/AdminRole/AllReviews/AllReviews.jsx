import { useState } from "react";
import AllReview from "../../../hooks/AllReview";
import AllReviewsRows from "./AllReviewsRows";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";


const AllReviews = () => {
  const [review, refetch] = AllReview();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = review.slice(startIndex, endIndex);
  const totalPages = Math.ceil(review.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(review);

  return (
    <div>
      <h2 className="text-4xl my-10 font-extrabold text-center">
        My Reviews: {review.length}
      </h2>
      <div className="overflow-x-auto table-container" style={{ minHeight: "400px" }}>
        <table className="table">
          {/* Head */}
          <thead>
            <tr className="grid grid-cols-9 text-xl font-extrabold text-black">
              <th className="col-span-3">Title</th>
              <th>Likes</th>
              <th className="col-span-3">Review</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((item) => (
              <AllReviewsRows key={item._id} item={item} refetch={refetch}></AllReviewsRows>
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

export default AllReviews;
