"use client";

import {
  LeftOutlined,
  PlayCircleFilled,
  PlayCircleTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import { map } from "lodash";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  phimMoi: any;
};

export const LatestHome: React.FC<Props> = ({ phimMoi }) => {
  // console.log(phimMoi);
  const [showPlay, setShowPlay] = useState<any>(
    Array(phimMoi.length).fill(false)
  );
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 400;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400;
    }
  };
  return (
    <div className="text-[#fff]">
      <div>
        <h3 className="uppercase text-lg border-l-[3px] pl-2 border-[#A3765D] mb-3">
          Phim mới cập nhật
        </h3>
      </div>
      <div
        className="relative"
        onMouseEnter={() => {
          setShowButton(true);
        }}
        onMouseLeave={() => {
          setShowButton(false);
        }}
      >
        {showButton ? (
          <>
            <button
              className=" absolute z-10 top-[40%] border-none p-3 max-md:hidden rounded-md rounded-md-r-none cursor-pointer bg-black bg-opacity-80 hover:opacity-70"
              onClick={handleScrollLeft}
            >
              <LeftOutlined className="text-white" />
            </button>
            <button
              className="absolute right-0 z-10 top-[40%] border-none p-3 max-md:hidden rounded-md rounded-md-l-none cursor-pointer bg-black bg-opacity-80 hover:opacity-70"
              onClick={handleScrollRight}
            >
              <RightOutlined className="text-white" />
            </button>
          </>
        ) : (
          <></>
        )}

        <div
          className=" flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
          ref={containerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {map(phimMoi, (movie, index) => (
            <Link
              key={index}
              className="snap-center cursor-pointer w-[200px] relative  z-0 text-white no-underline bg-[#181818] rounded-2xl"
              href={
                movie?.current_episode.toLowerCase() === "full"
                  ? `/watch/${movie?.slug}?tap=full`
                  : `/watch/${movie?.slug}?tap=1`
              }
              title={movie?.name}
            >
              <figure
                className=" relative w-full h-[290px] overflow-hidden rounded-2xl rounded-b-none"
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
              >
                <img
                  className="w-full h-full object-cover duration-500 transition-all transform-translate"
                  src={`${movie?.thumb_url}`}
                  alt="poster"
                />
                <div className="absolute top-6">
                  <div className="bg-[#A3765D] rounded-r-md px-3 text-white text-sm font-medium shadow-lg">
                    {movie?.current_episode}
                  </div>
                </div>

                {showPlay[index] ? (
                  <PlayCircleTwoTone
                    twoToneColor="#e74c3c"
                    className="absolute text-[#e74c3c] top-[40%] left-[35%] text-6xl transition-opacity duration-500 opacity-100"
                  />
                ) : (
                  <PlayCircleFilled className="absolute text-[#e74c3c] top-[45%] left-[40%] text-6xl transition-opacity duration-500 opacity-0" />
                )}
              </figure>
              <div className="w-full text-base font-medium p-3">
                <div className="truncate">{movie?.name}</div>
                <div className="text-sm opacity-70  truncate">
                  {movie?.original_name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
