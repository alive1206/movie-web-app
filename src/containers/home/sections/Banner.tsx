import { formattedDate } from "@/utils";
import {
  InfoCircleOutlined,
  PlayCircleFilled,
  PlayCircleTwoTone,
} from "@ant-design/icons";
import { Button, Carousel } from "antd";
import { map } from "lodash";
import Link from "next/link";
import { useState } from "react";

type Props = {
  phimTop: any;
};

export const BannerHome: React.FC<Props> = ({ phimTop }) => {
  const [showPlay, setShowPlay] = useState<any>(
    Array(phimTop.length).fill(false)
  );
  // console.log(phimTop);
  const carouselConfig = {
    infinite: true,
    slidesToShow: 2,
    swipeToSlide: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div>
        <h3 className="text-[#fff] mb-3 uppercase text-xl border-l-[3px] pl-2 border-[#A3765D]">
          Phim thịnh hành
        </h3>
      </div>
      <Carousel {...carouselConfig}>
        {map(phimTop, (movie, index) => (
          <div key={index} className="h-96">
            <div className="flex h-[90%] justify-center">
              <Link
                href={
                  movie?.current_episode.toLowerCase() === "full"
                    ? `/watch/${movie?.slug}?tap=full`
                    : `/watch/${movie?.slug}?tap=1`
                }
                className="relative cursor-pointer overflow-hidden poster-container"
                onMouseEnter={() => {
                  setShowPlay((prev: any) =>
                    prev.map((item: any, idx: any) =>
                      idx === index ? true : item
                    )
                  );
                }}
                onMouseLeave={() => {
                  setShowPlay((prev: any) =>
                    prev.map((item: any, idx: any) =>
                      idx === index ? false : item
                    )
                  );
                }}
                title={movie?.name}
              >
                <img
                  className="object-center object-cover h-full w-[250px] duration-500 transition-all transform-translate rounded-[3px]"
                  src={`${movie?.thumb_url}`}
                  alt={`${movie?.name}`}
                />
                {showPlay[index] ? (
                  <PlayCircleTwoTone
                    twoToneColor="#e74c3c"
                    className="absolute text-[#e74c3c] top-[45%] left-[40%] text-6xl transition-opacity duration-500 opacity-100"
                  />
                ) : (
                  <PlayCircleFilled className="absolute text-[#e74c3c] top-[45%] left-[40%] text-6xl transition-opacity duration-500 opacity-0" />
                )}
                {/* Mobile Screen */}
                <div className="mt-3 absolute bottom-0 left-0 p-2 bg-gradient-to-b from-transparent to-black w-full">
                  <div className="text-white font-medium text-base line-clamp-1">
                    {movie?.name}
                  </div>
                  <div className="text-white font-medium text-base opacity-70">
                    {formattedDate(movie?.created)}
                  </div>
                </div>
                <div className="absolute top-6">
                  <div className="bg-[#A3765D] rounded-r-md px-3 text-white text-sm font-medium shadow-lg">
                    {movie?.current_episode}
                  </div>
                </div>
                <div className="absolute right-0 top-0">
                  <div className="bg-[#e74c3c] rounded-tr-[3px] px-1 text-white text-sm font-medium shadow-lg">
                    Trending
                  </div>
                </div>
              </Link>

              {/* PC Screen */}
              <div className="p-3 text-[#fff] max-w-[250px] grid grid-rows-4 max-[1280px]:hidden">
                <div className="flex flex-col gap-2 row-span-3 max-w-[350px]">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="uppercase text-[#e74c3c] text-base font-bold line-clamp-1">
                      {movie?.name}
                    </div>
                    <div className="bg-[#e74c3c] rounded p-1 font-medium">
                      {movie?.quality}
                    </div>
                  </div>
                  <div className="text-[12px] text-[#999] mb-2 line-clamp-1">
                    {movie?.original_name}
                  </div>
                  <div className="bg-[#222] p-3 opacity-85 ">
                    <div>Trạng thái: {movie?.current_episode}</div>
                    <div>Thời lượng: {movie?.total_episodes} Tập</div>
                    <div>Ngôn ngữ: {movie?.language}</div>
                    <div className="line-clamp-3">
                      Nội dung phim: {""}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: movie?.description || "",
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Button
                    type="primary"
                    danger
                    href={
                      movie?.current_episode.toLowerCase() === "full"
                        ? `/watch/${movie?.slug}?tap=full`
                        : `/watch/${movie?.slug}?tap=1`
                    }
                    className="px-3 py-5 gap-[4px]"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        ></path>
                      </svg>
                    }
                    iconPosition="start"
                  >
                    Xem phim
                  </Button>
                  <Button
                    href={`/detail/${movie?.slug}`}
                    type="default"
                    className="px-3 py-5"
                    icon={<InfoCircleOutlined />}
                    iconPosition="start"
                  >
                    Thông tin chi tiết
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
