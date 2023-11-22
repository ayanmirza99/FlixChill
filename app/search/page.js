"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const page = () => {
  const [isloading, setIsloading] = useState(true);
  const [searchData, setSearchData] = useState();

  const getData = async (url) => {
    try {
      const response = await fetch(url + process.env.NEXT_PUBLIC_MOVIE_KEY);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      setIsloading(true);

      const searchData = [
        ...(await getData(
          "https://api.themoviedb.org/3/movie/popular?api_key="
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/movie/top_rated?api_key="
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/movie/now_playing?api_key="
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/movie/upcoming?api_key="
        )),
        ...(await getData("https://api.themoviedb.org/3/tv/popular?api_key=")),
        ...(await getData(
          "https://api.themoviedb.org/3/tv/top_rated?api_key="
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key="
        )),
      ];
      setSearchData(searchData);

      setIsloading(false);
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <Navbar />
    </div>
      <div className="h-[150vh] mt-24 z-30 w-full">
        { isloading ? (<h1>Loading Resources wait for a moment...</h1>) :
          searchData.map((item, index) => (
            <div key={index}>
              <h1>{item.id}</h1>
            </div>
          ))}
      </div>
    </>
  );
};

export default page;
