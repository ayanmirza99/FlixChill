"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    // <div className="h-[250px] w-[400px] 2xl:w-[400px] xl:w-[300px] lg:w-[250px] md:w-[220px] sm:w-[300px]">
      <Skeleton height={250} width={400}/>
    // </div>
  );
};

export default CardSkeleton;
