import { useState } from "react";
import useReview from "../../../hooks/useReview";
import ReviewCard from "../ReviewCard/ReviewCard";

const MyReviews = () => {
  const [review, refetch] = useReview();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = review.slice(startIndex, endIndex);
  const totalPages = Math.ceil(review.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2 className="text-4xl my-10 font-extrabold text-center">
        My Reviews: {review.length}
      </h2>
      <div className="overflow-x-auto table-container" style={{ minHeight: "400px" }}>
        <table className="table">
          {/* Head */}
          <thead>
            <tr className="grid grid-cols-10 text-xl font-extrabold text-black">
              <th className="col-span-3">Title</th>
              <th>Likes</th>
              <th className="col-span-3">Review</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((item) => (
              <ReviewCard key={item._id} item={item} refetch={refetch}></ReviewCard>
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

export default MyReviews;
