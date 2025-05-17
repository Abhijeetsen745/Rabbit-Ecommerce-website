import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

function NewArrivals() {

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canscrollRight, setCanscrollRight] = useState(true);
  const [canscrollLeft, setCanscrollLeft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(()=>{
    const fetchNewArrivals = async () => {
      try {
       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
       setNewArrivals(response.data);
       

      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  },[])

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };
  const handleScroll = () => {
    const container = scrollRef.current;
    // console.log(container.scrollLeft,container.clientWidth,container.scrollWidth);

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanscrollLeft(leftScroll > 0);
      setCanscrollRight(rightScrollable);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative ">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-700 mb-8">
          Discover the latest styles straight of the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* scorll button  */}
        <div className="absolute right-0 bottom-[-40px] md:bottom-[-37px] space-x-2 flex ">
          <button
            onClick={() => scroll("left")}
            disabled={!canscrollLeft}
            className={`p-2 rounded border ${
              canscrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400"
            } bg-white text-black`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canscrollRight}
            className={`p-2 rounded border ${
              canscrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400"
            } bg-white text-black`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* scrollable content */}
      <div
        ref={scrollRef}
        className="container mx-auto flex space-x-4 overflow-x-scroll relative scrollbar-none "
      >
        {newArrivals.map((product) => (
          <div
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative mt-2 md:mt-0"
            key={product._id}
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/static/${product.images[0].url}`}
              alt={product.images[0].altText}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name} </h4>
                <p className="mt-1">${product.price} </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;
