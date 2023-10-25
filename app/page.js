"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  return (
    <>
      <div className="default-main h-screen w-full flex flex-col gap-8 justify-center items-center text-white text-[3rem]">
        <h1 className="text-[1.4em] cursor-pointer font-bold">
          Welcome to <span className="text-red-600">FlixChill</span>
        </h1>
        <button
          className="bg-red-600 text-[0.6em] p-5 bottom-80 rounded-xl font-bold  @apply shadow-[6px_6px_0_#8d2536] transition-transform duration-[0.1s,box-shadow] delay-[0.1s] active:translate-x-2 active:translate-y-2 active:shadow-[0_0_0_#8d2536]}"
          onClick={()=> router.push("/login")}
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default page;
