"use client";
import { useGlobalContext } from "@/app/Context";
import React from "react";
import Navbar from "../Components/Navbar";
import Link from "next/link";

const page = () => {
  const { myList, type } = useGlobalContext();
  return (
    <>
      <Navbar />
      <section className="bg-[rgba(0,0,0,0.9)] flex justify-center items-center flex-col h-max min-h-screen pt-28">
        <div className="text-red-600 text-[3rem] font-bold text-center cursor-pointer">
          My List
        </div>
        <section className="flex gap-[7rem] flex-wrap py-16 w-[90%] items-center justify-center">
          {myList && myList.length > 0 ? (
            myList.map((item, index) => {
              return (
                <Link href={`/home/${type}/${item.id}`} key={index}>
                  <div className="w-[14rem] h-[25rem] rounded-lg overflow-hidden flex flex-col gap-4 text-[1rem] text-center text-white duration-300 hover:scale-110">
                    <img
                      className="h-[80%] w-full object-cover object-center"
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    />
                    <h1 className="text-[1.4em]">{item.name || item.title}</h1>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-white text-[3rem] flex justify-center items-center w-full text-center h-[60vh]">
              <h1>My List is empty</h1>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default page;
