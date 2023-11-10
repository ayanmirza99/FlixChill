"use client";
import Cards from "../Components/Cards";
import Navbar from "../Components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="bg-[rgba(0,0,0,0.9)] h-max min-h-screen pt-28">
        <div className="text-red-600 text-[3rem] font-bold text-center cursor-pointer">
          TV Shows
        </div>
        <section className="w-full flex justify-center items-center">
          <Cards
            url1={"https://api.themoviedb.org/3/tv/popular?api_key="}
            url2={"https://api.themoviedb.org/3/tv/top_rated?api_key="}
          />
        </section>
      </section>
    </>
  );
};

export default page;
