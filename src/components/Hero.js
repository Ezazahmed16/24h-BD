"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import PopularTab from "./tabs/PopularTab";
import RecentTab from "./tabs/RecentTab";
import TrendingTab from "./tabs/TrendingTab";

const Hero = (props) => {
  const { slider, featured, popular } = props;
  const [activeTab, setActiveTab] = useState("popular");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // You can fetch data or perform actions specific to the clicked tab here
  };
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "recent":
        // Fetch and render content for the "Recent" tab
        return <RecentTab latest={slider} />;
      case "popular":
        return <PopularTab popular={popular} />;
      case "trending":
        // Fetch and render content for the "Trending" tab
        return <TrendingTab featured={featured} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap pt-5 gap-5">
      <div className="md:w-8/12 sm:w-full w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
          onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
          {slider?.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Link href={`/news?id=${item.id}`}>
                  <div className="relative">
                    <Image
                      src={item.img1}
                      alt={item.title}
                      width={1920}
                      height={1080}
                      priority={true}
                      className="rounded md:h-[71.5vh] focus:outline-none"
                    />
                    <div className="absolute bottom-10 left-0 right-0 text-center bg-black bg-opacity-50 text-white p-2 rounded hover:text-blue-500 ease-linear transition-all duration-150">
                      <h2 className="text-[12px] md:text-xl">{item.title}</h2>
                      <p className="text-[10px] mt-5">{item.short_des}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
      <div className="md:w-[31%] w-full">
        <div className="flex justify-between w-full md:max-w-xl rounded shadow">
          <Link href="">
            <p
              onClick={() => handleTabClick("recent")}
              className={`w-full flex justify-center font-medium rounded-l px-5 py-2 border ${
                activeTab === "recent"
                  ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                  : " bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Recent
            </p>
          </Link>

          <Link href="">
            <p
              onClick={() => handleTabClick("popular")}
              className={`w-full flex justify-center font-medium px-5 py-2 border-t border-b ${
                activeTab === "popular"
                  ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Popular
            </p>
          </Link>

          <Link href="">
            <p
              onClick={() => handleTabClick("trending")}
              className={`w-full flex justify-center font-medium rounded-l px-5 py-2 border ${
                activeTab === "trending"
                  ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                  : " bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Trending
            </p>
          </Link>
        </div>
        <div className="mt-5">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Hero;
