"use client";
import React, { useEffect, useState } from "react";
import ReviewData from "./reviewData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Review = React.memo(({ loading }) => {
  const [randomReviews, setRandomReviews] = useState([]);
  const [review, setReview] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setReview(value);
  };

  const addReview = () => {
    const newReviewObject = {
      name: "Demo user",
      review: review,
    };
    setRandomReviews([...randomReviews, newReviewObject]);
    setReview("");
  };

  useEffect(() => {
    const generateRandomReviews = () => {
      const reviews = [];
      for (let i = 0; i <= 4; i++) {
        const randomIndex = Math.floor(Math.random() * ReviewData.length);
        reviews.push(ReviewData[randomIndex]);
      }
      setRandomReviews(reviews);
    };

    generateRandomReviews();
  }, []);
  return (
    <div className="xl:h-[75vh] xl:w-[450px] h-[64vh] w-full min-w-[320px] bg-[rgba(0,0,0,0.2)] rounded-xl p-2 -mt-10">
      {loading ? (
        <Skeleton baseColor="#202020" highlightColor="#444" className="w-full h-full"/>
      ) : (
        <>
          <div className="text-[1.5rem] sm:text-[2rem] h-[10%] font-bold pb-8 pt-4 text-red-600 text-center">
            Reviews
          </div>
          <div className="review-container h-[75%] w-full overflow-x-hidden overflow-y-auto text-[1rem] sm:text-[1.5rem]">
            {randomReviews.map((r, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col pb-5 hover:bg-[rgba(0,0,0,0.6)] cursor-pointer rounded-xl p-5"
                >
                  <div className="w-full h-max text-[1em]">
                    <h1>{r.review}</h1>
                  </div>
                  <div className="w-full flex justify-end text-gray-500 text-[0.6em]">
                    <h1>{r.name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full h-[15%] flex justify-center items-center gap-4 p-5">
            <input
              placeholder="Add your review"
              className="w-[75%] h-full bg-transparent py-4 px-2 rounded-lg outline-none focus:border-b-2 border-solid border-red-600"
              value={review}
              onChange={onChange}
            />
            <button
              className="w-[25%] h-full bg-red-600 rounded-lg sm:p-3 font-semibold"
              onClick={addReview}
              disabled={!review.trim()}
            >
              + Add
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default Review;
