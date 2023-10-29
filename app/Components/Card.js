"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Cards = ({ data, title, loading }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1064, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
      slidesToSlide: 2,
    },
    small: {
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
        <Carousel responsive={responsive} containerClass="carousel-container">
          {data.map((movie, index) => {
            return (
              <div
                className="h-[250px] w-full 2xl:w-[400px] xl:w-[300px] lg:w-[250px] md:w-[220px] sm:w-[300px]"
                key={index}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default Cards;
