"use client";
import Navbar from "@/app/Components/Navbar";
import Review from "@/app/Components/Review";
import { useGlobalContext } from "@/app/Context";
import React, { useEffect, useState } from "react";
import { CgAdd, CgTrashEmpty } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = ({ params }) => {
  const [addBtn, setAddBtn] = useState(true);
  const { id } = params;
  const { type } = params;

  const [details, setDetails] = useState({});
  const [isloading, setIsloading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(
        `${
          type === "movie"
            ? "https://api.themoviedb.org/3/movie"
            : "https://api.themoviedb.org/3/tv"
        }/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_KEY}`
      );
      const data = await response.json();
      setDetails(data);
    } catch (e) {
      console.log(e);
    } finally {
      if (details && details !== "") {
        setIsloading(false);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const formatDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const { myList, setMyList, setType } = useGlobalContext();

  useEffect(() => {
    if (details && myList) {
      let addedIndex = myList.find((item) => item.id === details.id);
      if (addedIndex) {
        setAddBtn(false);
      } else {
        setAddBtn(true);
      }
    }
  }, [details]);

  const addToMyList = () => {
    if (addBtn === true) {
      myList.push(details);
      setMyList(myList);
      setAddBtn(false);
      setType(type);
      console.log(myList);
    } else {
      const toBeDeletedIndex = myList.findIndex(
        (item) => item.id === details.id
      );
      myList.splice(toBeDeletedIndex, 1);
      setMyList(myList);
      setAddBtn(true);
    }
  };
  return (
    <>
      <Navbar />
      <section className="header bg-[rgba(0,0,0,0.9)] h-[76vh] md:h-[85vh] w-full">
        <div className="w-full h-[50vh] md:h-[65vh] bg-center bg-cover relative">
          {isloading ? (
            <Skeleton
              className="h-full w-full"
              baseColor="#202020"
              highlightColor="#444"
            />
          ) : (
            <img
              className="w-full h-full object-cover object-top"
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            />
          )}
          <div className="bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.5)] absolute top-0 z-20 w-full h-full flex items-end justify-center">
            <div className="h-[20rem] w-[50vw] z-30 absolute -bottom-[15%] md:-bottom-[25%] flex md:flex-row flex-col items-center text-[2rem] md:gap-[4rem] md:text-[3rem] text-white">
              {isloading ? (
                <Skeleton
                  height={300}
                  width={200}
                  baseColor="#202020"
                  highlightColor="#444"
                />
              ) : (
                <img
                  className="h-full w-[14rem] object-cover object-center rounded-lg"
                  src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                />
              )}
              <div className="details flex flex-col text-center md:mt-16 md:text-justify">
                <div>
                  {isloading ? (
                    <Skeleton baseColor="#202020" highlightColor="#444" />
                  ) : (
                    details.title || details.name
                  )}
                </div>
                <div className="text-[0.4em]">
                  <div>
                    {isloading ? (
                      <Skeleton baseColor="#202020" highlightColor="#444" />
                    ) : (
                      details.tagline || details.type
                    )}
                  </div>
                </div>
                <div className="w-[300px] mt-4">
                  {isloading ? (
                    <Skeleton baseColor="#202020" highlightColor="#444" />
                  ) : (
                    <div className="text-[0.4em] font-semibold text-red-600">
                      Genres:{" "}
                      {details.genres &&
                        details.genres.map((genre) => genre.name).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-max flex items-center justify-center bg-[rgba(0,0,0,0.9)]">
        {isloading ? (
          <Skeleton
            baseColor="#202020"
            highlightColor="#444"
            height={50}
            width={150}
          />
        ) : (
          <div className="flex gap-6">
            <button className="p-4 px-6 md:px-10 rounded-lg bg-yellow-500 text-white font-bold text[0.9rem] md:text-[1.2rem] hover:scale-105 duration-300">
              <a
                href={`https://www.imdb.com/title/${details.imdb_id}`}
                target="_blank"
              >
                Visit IMDb
              </a>
            </button>
            <button
              className={`p-4 px-6 md:px-10 rounded-lg ${
                addBtn ? "bg-red-600" : "bg-red-800"
              } text-white font-bold text[0.9rem] md:text-[1.2rem] hover:scale-105 duration-300`}
              onClick={addToMyList}
            >
              {addBtn ? (
                <div className="flex gap-2">
                  <CgAdd className="text-[2rem]" />
                  <h1>My List</h1>
                </div>
              ) : (
                <div className="flex gap-2">
                  <CgTrashEmpty className="text-[2rem]" />
                  <h1>My List</h1>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
      <section className="body w-full h-max flex xl:flex-row flex-col bg-[rgba(0,0,0,0.9)] text-white">
        <div className="xl:w-[50%] md:w-full h-full">
          {isloading ? (
            <>
              <div>
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#444"
                  width={200}
                  height={50}
                />
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#444"
                  width={700}
                  height={25}
                  count={4}
                />
              </div>
              <div className="flex flex-col gap-6 mt-4">
                {Array(4)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <Skeleton
                        key={index}
                        baseColor="#202020"
                        highlightColor="#444"
                        width={600}
                        height={25}
                      />
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 p-10 md:text-[2rem]">
                <h1 className="text-[1.1em] text-red-600">Synopsis:</h1>
                <h1 className="text-[0.8em]">{details.overview}</h1>
                <h1 className="text-[0.9em]">
                  <span className="text-red-600 text-[1.1em]">IMDb: </span>
                  {details.vote_average &&
                    parseFloat(details.vote_average.toFixed(1))}
                </h1>
                <h1 className="text-[0.9em]">
                  <span className="text-red-600 text-[1.1em]">Language:</span>{" "}
                  {details.spoken_languages &&
                    details.spoken_languages
                      .map((lang) => lang.english_name)
                      .join(", ")}
                </h1>
                <h1 className="text-[0.9em]">
                  <span className="text-red-600 text-[1.1em]">Status: </span>
                  {details.status}
                </h1>
                {details.release_date ? (
                  <h1 className="text-[0.9em]">
                    <span className="text-red-600 text-[1.1em]">
                      Release Date:{" "}
                    </span>
                    {details.release_date}
                  </h1>
                ) : (
                  <>
                    <h1 className="text-[0.9em]">
                      <span className="text-red-600 text-[1.1em]">
                        First Aired On:{" "}
                      </span>
                      {formatDate(details.first_air_date)}
                    </h1>
                    <h1 className="text-[0.9em]">
                      <span className="text-red-600 text-[1.1em]">
                        Last Aired On:{" "}
                      </span>
                      {formatDate(details.last_air_date)}
                    </h1>

                    <h1 className="text-[0.9em]">
                      <span className="text-red-600 text-[1.1em]">
                        Seasons:{" "}
                      </span>
                      {details.number_of_seasons}
                    </h1>

                    <h1 className="text-[0.9em]">
                      <span className="text-red-600 text-[1.1em]">
                        Episodes:{" "}
                      </span>
                      {details.number_of_episodes}
                    </h1>
                  </>
                )}
                <h1>
                  <span className="text-red-600">Production:</span>{" "}
                  {details.production_companies &&
                    details.production_companies
                      .map((prod) => prod.name)
                      .join(", ")}
                </h1>
              </div>
            </>
          )}
        </div>
        <div className="h-max xl:w-[50%] w-full flex justify-center items-center p-20">
          <Review loading={isloading} />
        </div>
      </section>
    </>
  );
};

export default page;
