"use client";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeCards = ({ data, title, type }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      slidesToSlide: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1064 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1064, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    small: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="flex justify-center items-center flex-col gap-6 h-[300px] mt-10">
      <div className="w-full text-white px-[2rem] text-[1.5rem] font-semibold">
        <h1>{title}</h1>
      </div>
      <div className="w-full px-[2.1rem]">
        <Carousel
          removeArrowOnDeviceType={["tablet", "mobile", "small"]}
          responsive={responsive}
          containerClass="carousel-container"
          draggable={false}
          swipeable={true}
        >
          {data.map((movie, index) => {
            return (
              <Link href={`/home/${type}/${movie.id}`} key={index}>
                <div className="h-[250px] card w-full 2xl:w-[450px] xl:w-[300px] lg:w-[250px] md:w-[220px] sm:w-[300px] group">
                  <img
                    src={
                      movie && movie.backdrop_path ? (
                        `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                      ) : (
                        <Skeleton
                          height={250}
                          width={400}
                          baseColor="#202020"
                          highlightColor="#444"
                        />
                      )
                    }
                    className="h-full w-full object-cover object-center relative"
                  />
                  <div className="card-info absolute flex flex-col items-start justify-end font-semibold text-[1rem] p-4 top-0 h-full w-full text-white visible md:invisible group-hover:visible [transition:all_0.3s] bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)]">
                    <h1>{movie.title || movie.name}</h1>
                    <h1>
                      Flix Meter:{" "}
                      {movie.vote_average &&
                        parseFloat(movie.vote_average.toFixed(1))}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default HomeCards;
