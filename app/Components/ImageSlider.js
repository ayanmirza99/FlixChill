"use client";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { BsPlayFill, BsPlusLg } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

function ImageSlider({ data, loading }) {
  const buttonStyle = {
    width: "0",
    background: "none",
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}></button>,
    nextArrow: <button style={{ ...buttonStyle }}></button>,
  };
  return (
    <div className="slide_container">
      <Slide {...properties}>
        {data.map((movie, index) => (
          <div
            className="flex items-center w-screen justify-center h-[95vh] bg-cover relative"
            key={index}
          >
            <div className="w-[100vw] h-[95vh] fixed">
              {loading ? (
                <Skeleton
                  className="h-full w-full"
                  baseColor="#202020"
                  highlightColor="#444"
                />
              ) : (
                <img
                  className="h-full w-full object-cover slide object-position"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
              )}
            </div>
            <div className="layer bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)] z-10 absolute top-0 w-full h-full"></div>
            <div className="sliderTitle text-[1.5rem] absolute left-10 text-white z-20 flex flex-col gap-6 xl:text-[3.5rem] lg:text-[3rem] sm:text-[2.5rem] sm:left-20">
              <h1 className="text-[1em] font-extrabold cursor-pointer">
                {loading ? (
                  <Skeleton baseColor="#323232" highlightColor="#444" />
                ) : (
                  movie.original_title
                )}
              </h1>
              <div className="sliderBtns flex text-[0.4em] gap-4">
                <Link href={`/home/movie/${movie.id}`}>
                  <button
                    className={`${
                      loading ? "bg-[#323232]" : "bg-white"
                    } text-black py-2 font-semibold rounded w-[7rem] flex items-center justify-center sm:w-[10rem]`}
                  >
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <>
                        <BsPlayFill /> Play
                      </>
                    )}
                  </button>
                </Link>
                <button
                  className={`${
                    loading ? "bg-[#323232]" : "bg-[#494949]"
                  } rounded py-2 font-semibold w-[7rem] flex justify-center items-center sm:w-[10rem]`}
                >
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <BsPlusLg /> My List
                    </>
                  )}
                </button>
              </div>
              <div className="sliderDescription text-[0.35em] cursor-pointer w-[280px] sm:w-[480px]">
                {loading ? (
                  <Skeleton
                    baseColor="#323232"
                    highlightColor="#444"
                    count={3}
                  />
                ) : (
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
