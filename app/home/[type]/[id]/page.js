"use client";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = params;
  const { type } = params;
  const [details, setDetails] = useState({});
  const getData = async () => {
    try {
      const response = await fetch(
        `${
          type === "movie"
            ? "https://api.themoviedb.org/3/movie"
            : "https://api.themoviedb.org/3/tv"
        }/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_KEY}`
      );
      const data = await response.json();
      setDetails(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>{details.original_title || details.original_name}</div>;
};

export default page;
