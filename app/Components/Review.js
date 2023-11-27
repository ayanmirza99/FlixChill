"use client";
import React, { useEffect, useState } from "react";
import ReviewData from "./reviewData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiTwotoneDelete } from "react-icons/ai";

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

  const removeReview = (rev) => {
    let toBeRemovedIndex = randomReviews.findIndex(
      (item) => item.review === rev
    );
    randomReviews.splice(toBeRemovedIndex, 1);
    setRandomReviews([...randomReviews]);
  };

  return (
    <div className="xl:h-[75vh] xl:w-[450px] h-[64vh] w-full min-w-[320px] bg-[rgba(0,0,0,0.2)] rounded-xl p-2 -mt-10">
      {loading ? (
        <Skeleton
          baseColor="#202020"
          highlightColor="#444"
          className="w-full h-full"
        />
      ) : (
        <>
          <div className="text-[2rem] h-[10%] font-bold pb-8 md text-red-600 text-center">
            Reviews
          </div>
          <div className="review-container h-[75%] w-full overflow-x-hidden overflow-y-auto text-[1.3rem] sm:text-[1.5rem]">
            {randomReviews.map((r, index) => {
              return r.name === "Demo user" ? (
                <div
                  key={index}
                  className="w-full flex flex-col pb-5 hover:bg-[rgba(0,0,0,0.6)] cursor-pointer rounded-xl p-5"
                >
                  <div className="w-full h-max text-[1em]">
                    <h1>{r.review}</h1>
                  </div>
                  <div className="w-full flex items-end flex-col text-gray-500 text-[0.6em] relative">
                    <div className="group flex flex-col items-end">
                      <label className="absolute -top-[40px] text-white bg-gray-600 p-2 rounded-lg invisible group-hover:visible duration-200">
                        Delete review
                      </label>
                      <button onClick={() => removeReview(r.review)}>
                        <AiTwotoneDelete className="text-red-600 text-[2rem]" />
                      </button>
                    </div>
                    <h1>{r.name}</h1>
                  </div>
                </div>
              ) : (
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
              className="w-[25%] h-full bg-red-600 rounded-lg pr-2 sm:p-3 font-semibold"
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
