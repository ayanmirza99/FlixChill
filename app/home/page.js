"use client";
import Navbar from "../Components/Navbar";
import ImageSlider from "../Components/ImageSlider";
import HomeCards from "../Components/HomeCards";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiCloseLine } from "react-icons/ri";
import { useGlobalContext } from "../Context";
import SearchModal from "../Components/SearchModal";

const page = () => {
  const [isloading, setIsloading] = useState(true);
  const [popularMovies, setPopulerMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popoularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [onAirTV, setOnAirTV] = useState([]);

  const { setSearchData, searchModal, setSearchModal } = useGlobalContext();

  const getData = async (url, store) => {
    try {
      const response = await fetch(url + process.env.NEXT_PUBLIC_MOVIE_KEY);
      const data = await response.json();
      store(data.results);
      return data.results;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  useEffect(() => {
    if (searchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchModal]);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const data = [
        ...(await getData(
          "https://api.themoviedb.org/3/movie/popular?api_key=",
          setPopulerMovies
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=",
          setTopRatedMovies
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=",
          setNowPlayingMovies
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=",
          setUpcomingMovies
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/tv/popular?api_key=",
          setPopularTV
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=",
          setTopRatedTV
        )),
        ...(await getData(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=",
          setOnAirTV
        )),
      ];

      setSearchData(data);
      setIsloading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {searchModal && (
        <section className="fixed h-[100vh] w-[100%] flex flex-col bg-[rgba(0,0,0,0.6)] z-50 ">
          <div className="w-full text-[2.5rem] md:text-[3.5rem] text-red-600 flex justify-end p-6 lg:p-12 pt-16">
            <button
              className="hover:scale-125 duration-200 ease-in"
              onClick={() => setSearchModal(false)}
            >
              <RiCloseLine />
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <SearchModal />
          </div>
        </section>
      )}
      <section className="header">
        <Navbar />
        <ImageSlider data={nowPlayingMovies} loading={isloading} />
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
            <HomeCards
              data={upcomingMovies}
              title={"Upcoming Movies"}
              type={"movie"}
            />
          </section>
        )}
      </section>
    </>
  );
};

export default page;
