import React, { useState, useEffect } from "react";
import "./review.css";
import { getReview } from "../../calls/review/reviewInfo";
const Testimonial = () => {
  const [review, setReview] = useState("");
  const getReviews = async () => {
    try {
      getReview().then((res) => {
        setReview(res);
        console.log(res);
      });
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const renderStars = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  useEffect(() => {
    // Call the getReview function when the component mounts
    getReviews();
  }, []);
  return (
    <div className="main" id="content">
      <h1
        className="fs-2 font-weight-bold dashboard-left text-center mt-5 reviwH1 "
        style={{ marginLeft: "-20px" }}
      >
        Reviews
      </h1>
      <div className="testimonial">
        {review?.reviews?.map((reviewText, index) => (
          <>
            <blockquote key={index} className="mdQutestblk mdQutestblk3">
              {reviewText.comment}
              <br></br>
              <br></br>
              <br></br>

              {renderStars(reviewText.rating)}
            </blockquote>
            <p>{reviewText.reviewer_name}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
