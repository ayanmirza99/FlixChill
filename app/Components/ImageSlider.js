"use client";
import React, { useState, useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { BsPlayFill, BsPlusLg } from "react-icons/bs";

function ImageSlider() {
  const [popularMovies, setPopulerMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setPopulerMovies(data.results));
  }, []);

  return (
    <div className="slide_container">
      <Slide>
        {popularMovies.map((movie, index) => (
          <div
            className="flex items-center w-screen justify-center h-[95vh] bg-cover relative top-0"
            key={index}
          >
            <div className="new w-[100vw] h-[95vh] fixed">
              <img
                className="h-full w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}/>
            </div>
            <div className="sliderTitle text-[4rem] absolute lg:left-20 text-white z-20 flex flex-col gap-6 sm:left-10">
              <h1 className="text-[1em] font-extrabold cursor-pointer">
                {movie && movie.original_title}
              </h1>
              <div className="sliderBtns flex text-[0.4em] gap-4">
                <button className="bg-white text-black py-2 font-semibold rounded w-[10rem] flex items-center justify-center">
                  <BsPlayFill /> Play
                </button>
                <button className="bg-[#494949] rounded py-2 font-semibold w-[10rem] flex justify-center items-center">
                  <BsPlusLg /> My List
                </button>
              </div>
              <div className="sliderDescription text-[0.35em] w-[480px] cursor-pointer">
                {movie && movie.overview}
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default ImageSlider;
