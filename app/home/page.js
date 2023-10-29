"use client";
import Navbar from "../Components/Navbar";
import ImageSlider from "../Components/ImageSlider";
import Cards from "../Components/Card";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import CardSkeleton from "../Components/CardSkeleton";

const page = () => {
  const [isloading, setIsloading] = useState(true);
  const [popularMovies, setPopulerMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMoies, setUpcomingMovies] = useState([]);

  const getData = async (url, store) => {
    try {
      const response = await fetch(url + process.env.NEXT_PUBLIC_MOVIE_KEY);
      // setIsloading(false);
      const data = await response.json();
      store(data.results);
      if (store && store.length > 0) {
        setIsloading(false)
      }
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   setTimeout(() => {
    //     setIsloading(false);
    //   }, 1500);
    // }
  };
  useEffect(() => {
    getData(
      "https://api.themoviedb.org/3/movie/popular?api_key=",
      setPopulerMovies
    );
    getData(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=",
      setTopRatedMovies
    );
    getData(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=",
      setNowPlayingMovies
    );
    getData(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=",
      setUpcomingMovies
    );
  }, []);

  return (
    <>
      <section className="header">
        <Navbar />
        <ImageSlider data={popularMovies} loading={isloading} />
      </section>
      <section className="h-max w-full flex bg-[rgba(0,0,0,0.9)] pb-10">
        {isloading ? (
          Array(4)
            .fill(0)
            .map((item, index) => {
              return (
                <>
                  <Skeleton height={250} width={400} key={index}/>
                </> 
                  );
            })
        ) : (
          <section className="h-max w-full flex-col flex">
            <Cards data={popularMovies} title={"Popular Movies"} />
            <Cards data={topRatedMovies} title={"Top Rated Movies"} />
            <Cards data={nowPlayingMovies} title={"Now Playing Movies"} />
            <Cards data={upcomingMoies} title={"Upcoming Movies"} />
          </section>
        )}
      </section>
    </>
  );
};

export default page;
