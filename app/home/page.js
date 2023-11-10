"use client";
import Navbar from "../Components/Navbar";
import ImageSlider from "../Components/ImageSlider";
import HomeCards from "../Components/HomeCards";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = () => {
  const [isloading, setIsloading] = useState(true);
  const [popularMovies, setPopulerMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popoularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [onAirTV, setOnAirTV] = useState([]);

  const getData = async (url, store) => {
    try {
      const response = await fetch(url + process.env.NEXT_PUBLIC_MOVIE_KEY);
      const data = await response.json();
      store(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
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
    getData("https://api.themoviedb.org/3/tv/popular?api_key=", setPopularTV);
    getData(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=",
      setTopRatedTV
    );
    getData("https://api.themoviedb.org/3/tv/on_the_air?api_key=", setOnAirTV);
  }, []);

  return (
    <>
      <section className="header">
        <Navbar />
        <ImageSlider data={popularMovies} loading={isloading} />
      </section>
      <section className="h-max w-full bg-[rgba(0,0,0,0.9)] pb-10">
        {isloading ? (
          <div className="flex justify-center p-12 gap-6 flex-wrap">
            {Array(12)
              .fill(0)
              .map((item, index) => {
                return (
                  <Skeleton
                    height={250}
                    width={400}
                    key={index}
                    baseColor="#202020"
                    highlightColor="#444"
                  />
                );
              })}
          </div>
        ) : (
          <section className="h-max w-full flex-col flex">
            <HomeCards
              data={popularMovies}
              title={"Popular Movies"}
              type={"movie"}
            />
            <HomeCards
              data={topRatedMovies}
              title={"Top Rated Movies"}
              type={"movie"}
            />
            <HomeCards
              data={nowPlayingMovies}
              title={"Now Playing Movies"}
              type={"movie"}
            />
            <HomeCards
              data={upcomingMovies}
              title={"Upcoming Movies"}
              type={"movie"}
            />
            <HomeCards
              data={popoularTV}
              title={"Popular TV Shows"}
              type={"tv"}
            />
            <HomeCards
              data={topRatedTV}
              title={"Top Rated TV Shows"}
              type={"tv"}
            />
            <HomeCards
              data={onAirTV}
              title={"Top Rated TV Shows"}
              type={"tv"}
            />
          </section>
        )}
      </section>
    </>
  );
};

export default page;
