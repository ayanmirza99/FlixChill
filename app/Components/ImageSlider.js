"use client";
import React, { useState, useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { BsPlayFill, BsPlusLg } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ImageSlider({ data, loading }) {
  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setPopulerMovies(data.results));
  // }, []);

  return (
    <div className="slide_container">
      <Slide>
        {data.map((movie, index) => (
          <div
            className="flex items-center w-screen justify-center h-[95vh] bg-cover relative top-0"
            key={index}
          >
            <div className="new w-[100vw] h-[95vh] fixed">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <img
                  className="h-full w-full object-cover object-position"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
              )}
            </div>
            <div className="sliderTitle text-[1.5rem] absolute left-10 text-white z-20 flex flex-col gap-6 xl:text-[3.5rem] lg:text-[3rem] sm:text-[2.5rem] sm:left-20">
              <h1 className="text-[1em] font-extrabold cursor-pointer">
                {loading ? (<Skeleton/>) : (
                  movie.original_title
                )}
              </h1>
              <div className="sliderBtns flex text-[0.4em] gap-4">
                <button className="bg-white text-black py-2 font-semibold rounded w-[7rem] flex items-center justify-center sm:w-[10rem]">
                  <BsPlayFill /> Play
                </button>
                <button className="bg-[#494949] rounded py-2 font-semibold w-[7rem] flex justify-center items-center sm:w-[10rem]">
                  <BsPlusLg /> My List
                </button>
              </div>
              <div className="sliderDescription text-[0.35em] cursor-pointer w-[280px] sm:w-[480px]">
                {loading ? (<Skeleton/>) : (
                  movie.overview
                )}
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default ImageSlider;
