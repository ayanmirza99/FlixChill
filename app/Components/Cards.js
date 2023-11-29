import React, { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";

const Cards = ({ url1, url2 }) => {
  const pathname = usePathname();
  let type;
  if (pathname === "/tvShows") {
    type = "tv";
  } else {
    type = "movie";
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await fetch(
          `${url1}${process.env.NEXT_PUBLIC_MOVIE_KEY}`
        );
        const data1 = await response1.json();
        const response2 = await fetch(
          `${url2}${process.env.NEXT_PUBLIC_MOVIE_KEY}`
        );
        const data2 = await response2.json();
        setData(() => [...data1.results, ...data2.results]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-[2rem] sm:gap-[4rem] lg:gap-[7rem] flex-wrap py-16 w-[90%]">
        {loading ? (
          <div className="flex flex-col gap-8 text-center">
            <Skeleton
              height={80}
              width={250}
              baseColor="#202020"
              highlightColor="#444"
            />
            <div className="flex flex-wrap justify-center items-center gap-[7rem]">
              {Array(10)
                .fill(0)
                .map((item, index) => {
                  return (
                    <Skeleton
                      height={400}
                      width={250}
                      key={index}
                      baseColor="#202020"
                      highlightColor="#444"
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          data.map((item, index) => {
            return (
              <Link href={`/home/${type}/${item.id}`} key={index}>
                <div className="w-[10rem] md:w-[14rem] h-[18rem] md:h-[25rem] rounded-lg overflow-hidden flex flex-col gap-4 text-[1rem] text-center text-white duration-300 hover:scale-110">
                  <img
                    className="h-[80%] w-full object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  />
                  <h1 className="text-[1.4em]">{item.name || item.title}</h1>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Cards;
