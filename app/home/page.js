"use client";
import Navbar from "../Components/Navbar";
import ImageSlider from "../Components/ImageSlider";

const page = () => {

  return (
    <>
      <section className="header">
        <Navbar />
        <ImageSlider />
      </section>
      <section className="h-[100vh] bg-[rgba(0,0,0,0.9)]"></section>
    </>
  );
};

export default page;
