"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("demo_user");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "demo_user" && password === "demo123") {
      router.push("/home");
    }
  };
  return (
    <>
      <div className="loginMain h-[85vh] w-[100%]">
        <div className="overlay h-full w-full z-10 bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
          <div className="h-[25rem] md:h-[35rem] w-[16rem] md:w-[27rem] bg-[rgba(0,0,0,0.75)] rounded-lg pt-12 pb-8 px-8 md:py-24 md:px-16 text-[1.5rem] md:text-[2rem] text-white">
            <div className="heading font-semibold text-[1.2em]">Sign In</div>
            <form
              className="flex flex-col w-full gap-6 mt-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={username}
                placeholder="Enter Email or username"
                className="text-[0.65em] outline-none w-full px-4 p-2 bg-[#333333] focus:bg-[#494949]"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="text-[0.65em] flex gap-2 outline-none w-[100%] px-4 p-2 bg-[#333333] focus-within:bg-[#494949]">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter Password"
                  className="outline-none w-[100%] bg-transparent focus:bg-[#494949]"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password ? (
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <button
                className="w-full bg-red-600 text-[0.6em] font-semibold mt-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </form>
            <div></div>
          </div>
        </div>
      </div>
      <div className="w-full h-max bg-[rgba(0,0,0,0.9)] flex justify-center items-center">
        <div className="w-[60%] flex flex-col gap-3 py-[25.5px]">
          <a className="w-full text-[#6a6a6a] cursor-pointer hover:underline">
            Questions? Contact us
          </a>
          <div className="w-full flex flex-wrap gap-4 justify-between text-[#6a6a6a] cursor-pointer underline md:no-underline">
            <div className=" flex flex-col gap-2">
              <a className="hover:underline">FAQ</a>
              <a className="hover:underline">Cookie Prefrences</a>
            </div>
            <div className=" flex flex-col gap-2">
              <a className="hover:underline">Help Center</a>
              <a className="hover:underline">Corporate Information</a>
            </div>
            <div className="flex flex-col gap-2">
              <a className="hover:underline">Terms of use</a>
              <a className="hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
