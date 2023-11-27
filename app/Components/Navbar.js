"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { useGlobalContext } from "../Context";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [istoggle, setIstoggle] = useState(false);
  const [profile, setProfile] = useState(false);

  const { setSearchModal, searchData } = useGlobalContext();

  const toggleNav = () => {
    setIstoggle(!istoggle);
  };

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  return (
    <section className="flex flex-col">
      <div
        className={`navbar w-screen h-[80px] flex items-center justify-between px-[2rem] fixed text-white lg:text-[1.5rem] z-30 ${
          color ? "bg-[rgba(0,0,0,0.9)]" : ""
        } md:text-[1.2rem]
        ${istoggle ? "bg-[rgba(0,0,0,0.9)]" : ""}`}
      >
        <div className="Navlogo text-[1.8em] text-red-600 font-bold">
          FlixChill
        </div>
        <nav className="NavLinks hidden lg:inline-flex items-center gap-10 text-[0.9em] font-semibold">
          <Link href="/home">
            <h3
              className={
                window.location.pathname === "/home"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              Home
            </h3>
          </Link>
          <Link href="/tvShows">
            <h3
              className={
                window.location.pathname === "/tvShows"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              TV Shows
            </h3>
          </Link>
          <Link href="/movies">
            <h3
              className={
                window.location.pathname === "/movies"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              Movies
            </h3>
          </Link>
          <Link href="/mylist">
            <h3
              className={
                window.location.pathname === "/mylist"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              My List
            </h3>
          </Link>
        </nav>
        <div className="NavBtns text-[1.3em] flex items-center gap-8">
          <button
            className={
              window.location.pathname === "/search"
                ? "text-red-600 font-bold"
                : ""
            }
          >
            {window.location.pathname === "/home" && searchData ? (
              <button
                className="hover:text-red-600"
                onClick={() => setSearchModal(true)}
              >
                <AiOutlineSearch />
              </button>
            ) : (
              ""
            )}
          </button>
          <div className="flex flex-col gap-4 relative icon hover:text-red-600">
            <CgProfile onClick={() => setProfile(!profile)} />
            {profile && (
              <div className="dropdown w-max h-max absolute top-12 px-2 py-2 -right-4 lg:-right-4 bg-[rgba(0,0,0,0.9)] rounded-lg text-white text-[1.5rem] before:bg-[rgba(0,0,0,0.9)]">
                <h1 className="text-[0.7em] cursor-pointer rounded-lg hover:bg-[rgba(23,23,23)] p-4">
                  Demo user
                </h1>
                <Link href="/">
                  <h1 className="text-[0.7em] hover:bg-red-600 duration-300 ease-out rounded-lg p-4">
                    Log out
                  </h1>
                </Link>
              </div>
            )}
          </div>
          {istoggle ? (
            <button className="inline-flex lg:hidden" onClick={toggleNav}>
              <AiOutlineClose className="text-red-600 font-extrabold text-[1.8rem]" />
            </button>
          ) : (
            <button
              className="inline-flex lg:hidden text-red-600"
              onClick={toggleNav}
            >
              <FaBars />
            </button>
          )}
        </div>
      </div>
      {istoggle && (
        <nav
          className="NavLinks text-[1.2em] z-50 fixed pt-[10px] pb-[40px] top-[78.5px] w-full bg-[rgba(0,0,0,0.9)] text-white font-semibold flex items-center justify-center
        flex-col gap-10"
        >
          <Link href="/home">
            <h3
              className={
                window.location.pathname === "/home"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              Home
            </h3>
          </Link>
          <Link href="/tvShows">
            <h3
              className={
                window.location.pathname === "/tvShows"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              TV Shows
            </h3>
          </Link>
          <Link href="/movies">
            <h3
              className={
                window.location.pathname === "/movies"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              Movies
            </h3>
          </Link>
          <Link href="/mylist">
            <h3
              className={
                window.location.pathname === "/mylist"
                  ? "text-red-600 font-bold"
                  : ""
              }
            >
              My List
            </h3>
          </Link>
        </nav>
      )}
    </section>
  );
};

export default Navbar;
