import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../Context";
import Link from "next/link";
import { MagnifyingGlass, TailSpin } from "react-loader-spinner";

const SearchModal = () => {
  const { searchData } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const [isloading, setIsloading] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const searchResultRef = useRef(null);

  const { setSearchModal } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchResultRef.current) {
      searchResultRef.current.classList.add("expanded");
      setIsloading(true);
    }
  };
  const getResult = (value) => {
    const results = searchData.filter((item) => {
      return (
        (item.title &&
          item.title.toLowerCase().includes(value.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(value.toLowerCase()))
      );
    });
    const seenIds = new Set();
    const filteredResult = results.filter((obj) => {
      if (!seenIds.has(obj.id)) {
        seenIds.add(obj.id);
        return true;
      }
      return false;
    });
    setTimeout(() => {
      setIsloading(false);
      setSearchResults(filteredResult);
    }, 2000);
  };

  useEffect(() => {
    if (searchResultRef.current) {
      if (searchValue.trim() === "") {
        searchResultRef.current.classList.remove("expanded");
      }
    }
  }, [handleSubmit]);
  return (
    <>
      <div className="min-w-[320px] w-[80vw] md:w-[50vw] h-[60vh] md:h-[80vh] text-[1rem] lg:text-[1.5rem] mt-12 md:-mt-12 bg-[rgba(0,0,0,0.9)] rounded-2xl flex justify-center items-center flex-col gap-4 text-white shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]">
        <h1 className="text-[2em] text-red-600 font-bold text-center pt-4 md:pt-0">
          Search FlixChill
        </h1>
        <form
          className="SearchBar flex justify-center gap-4 items-center w-[90%]"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-[rgba(0,0,1,0.8)] p-3 lg:p-5 w-[80%] text-[1em] outline-none border-solid border-red-600 rounded-xl border-b-2"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            value={searchValue}
          />
          <button
            className="w-[20%] font-bold p-2 md:p-3 lg:p-5 rounded-xl text-[0.7em] bg-red-600"
            disabled={!searchValue.trim()}
            onClick={() => getResult(searchValue)}
          >
            Search
          </button>
        </form>
        <div
          ref={searchResultRef}
          className="SearchResult hidden w-full overflow-y-auto"
        >
          <div className="w-full h-max flex justify-center items-center flex-col gap-6 p-8">
            {isloading ? (
              <div className="w-full h-[200px] md:h-[400px] flex justify-center items-center">
                <TailSpin
                  height="80"
                  width="80"
                  color="#dc2626"
                  ariaLabel="tail-spin-loading"
                  radius="0"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              searchResults.map((result, index) => {
                return (
                  <Link
                    href={`/home/${result.first_air_date ? "tv" : "movie"}/${
                      result.id
                    }`}
                  >
                    <div
                      onClick={() => {
                        setTimeout(() => {
                          setSearchModal(false);
                        }, 4000);
                      }}
                      key={index}
                      className="w-full h-[25%] flex gap-6 rounded-lg p-4 overflow-hidden hover:bg-[rgba(23,23,23)] duration-200 ease-in"
                    >
                      <div className="w-[50%] md:w-[35%] h-full object-cover object-center">
                        <img
                          src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-[70%] h-full gap-2 text-[0.9rem] lg:text-[1.4rem]">
                        <h1 className="w-full">
                          {result.name || result.title}
                        </h1>
                        <h1 className="text-[0.7em]">
                          Flix Meter:{" "}
                          {parseFloat(result.vote_average.toFixed(1))}
                        </h1>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex h-[200px] md:h-[400px] flex-col justify-center items-center">
                <MagnifyingGlass
                  visible={true}
                  height="120"
                  width="120"
                  ariaLabel="MagnifyingGlass-loading"
                  wrapperStyle={{}}
                  wrapperClass="MagnifyingGlass-wrapper"
                  glassColor="#c0efff"
                  color="#dc2626"
                />
                <h1 className="font-semibold">
                  Couln't find aything for '{searchValue}'
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
