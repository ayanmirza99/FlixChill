// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [istoggle, setIstoggle] = useState(false);

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
        className={`navbar w-screen h-[80px] flex items-center justify-between px-[2rem] fixed text-white text-[1.5rem] z-30 ${
          color ? "bg-[rgba(0,0,0,0.9)]" : ""
        } ${istoggle ? "bg-[rgba(0,0,0,0.9)]" : ""}`}
      >
        <div className="Navlogo text-[1.8em] text-red-600 font-bold">
          FlixChill
        </div>
        <nav className="NavLinks hidden lg:inline-flex items-center gap-10 text-[0.9em] font-semibold">
          <h3>Home</h3>
          <h3>TV Shows</h3>
          <h3>Movies</h3>
          <h3>Recently Added</h3>
          <h3>My List</h3>
        </nav>
        <div className="NavLinks NavBtns text-[1.3em] flex items-center gap-8">
          <button>
            <AiOutlineSearch />
          </button>
          <button>
            <CgProfile />
          </button>
          {istoggle ? (
            <button className="inline-flex lg:hidden" onClick={toggleNav}>
              <AiOutlineClose />
            </button>
          ) : (
            <button className="inline-flex lg:hidden" onClick={toggleNav}>
              <FaBars />
            </button>
          )}
        </div>
      </div>
      {istoggle && (
        <nav className="NavLinks text-[1.2em] z-30 fixed pt-[10px] pb-[40px] top-[80px] w-full bg-[rgba(0,0,0,0.9)] text-white font-bold flex items-center justify-center
        flex-col gap-10">
          <h3>Home</h3>
          <h3>TV Shows</h3>
          <h3>Movies</h3>
          <h3>Recently Added</h3>
          <h3>My List</h3>
        </nav>
      )}
    </section>
  );
};

export default Navbar;
