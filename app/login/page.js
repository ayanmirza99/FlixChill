"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      router.push("/home");
    } else {
      console.log("bhai likh to le pehle");
    }
  };
  return (
    <>
      <div className="loginMain h-[85vh] w-[100%]">
        <div className="overlay h-full w-full z-10 bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
          <div className="h-[36rem] w-[27rem] bg-[rgba(0,0,0,0.75)] py-24 px-16 text-[2rem] text-white">
            <div className="heading font-semibold text-[1.2em]">Sign In</div>
            <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                placeholder="Enter Email or username"
                className="text-[0.65em] outline-none w-[100%] px-4 p-2 bg-[#333333] focus:bg-[#494949]"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                className="text-[0.65em] outline-none w-[100%] px-4 p-2 bg-[#333333] focus:bg-[#494949]"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full bg-red-600 text-[0.6em] font-semibold mt-4 py-2 rounded">
                Sign In
              </button>
            </form>
            <div>
              <Link href="/home">
                <h1 className="text-[0.6em] mt-5 w-max transition-all hover:text-red-600 cursor-pointer">
                  Demo Sign In
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-max bg-[rgba(0,0,0,0.9)] flex justify-center items-center">
        <div className="w-[60%] flex flex-col gap-3 py-[25.5px]">
          <a className="w-full text-[#6a6a6a] cursor-pointer hover:underline">
            Questions? Contact us
          </a>
          <div className="w-full flex flex-wrap justify-between text-[#6a6a6a] cursor-pointer">
            <div className=" flex flex-col gap-2">
              <a className="hover:underline">FAQ</a>
              <a className="hover:underline">Cookie Prefrences</a>
            </div>
            <div className=" flex flex-col gap-2">
              <a className="hover:underline">Help Center</a>
              <a className="hover:underline">Corporate Information</a>
            </div>
            <div className="">
              <a className="hover:underline">Terms of use</a>
            </div>
            <div className="">
              <a className="hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
