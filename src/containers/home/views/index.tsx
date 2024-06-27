"use client";

import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel, Space, Spin } from "antd";
import { map } from "lodash";
import { useEffect, useRef, useState } from "react";
import "../styles/home.css";

type Props = {
  phimMoi?: any;
};

export const Home: React.FC<Props> = ({ phimMoi }) => {
  const [loading, setLoading] = useState(true);
  console.log(phimMoi);
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  useEffect(() => {
    if (phimMoi !== undefined) {
      setLoading(false);
    }
  }, [phimMoi]);

  return (
    <div>
      <div className="container">
        <div>
          <Carousel arrows infinite={true} autoplay={true}>
            {map(phimMoi, (movie, index) => (
              <div key={index} className="bg-black">
                <figure className="w-[500px] h-[500px] overflow-hidden rounded-2xl ">
                  <img
                    className="w-full h-full object-cover duration-500 transition-all transform-translate"
                    src={`${movie?.poster_url}`}
                    alt="poster"
                  />
                </figure>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Section phim mới cập nhật */}
        <div className=" w-full">
          <div>
            <h3>
              Phim mới cập nhật <span>-{">"}</span>
            </h3>
          </div>
          <div className="relative">
            <button
              className=" absolute z-10 top-[45%] border-none"
              onClick={handleScrollLeft}
            >
              <LeftOutlined />
            </button>
            <button
              className="absolute right-0 z-10 top-[45%] border-none"
              onClick={handleScrollRight}
            >
              <RightOutlined />
            </button>
            <div
              className=" flex gap-6 overflow-x-scroll scroll scroll-smooth snap-x snap-mandatory no-scrollbar"
              ref={containerRef}
              style={{ scrollBehavior: "smooth" }}
            >
              {!loading ? (
                map(phimMoi, (movie, index) => (
                  <div
                    key={index}
                    className="snap-center cursor-pointer w-[200px] relative pb-6 z-0"
                  >
                    <figure className="w-[200px] h-[290px] overflow-hidden rounded-2xl">
                      <img
                        className="w-full h-full object-cover duration-500 transition-all transform-translate"
                        src={`${movie?.thumb_url}`}
                        alt="poster"
                      />
                    </figure>
                    <div>
                      <span className=" text-center line-clamp-1 absolute bottom-[0] w-full">
                        {movie?.name}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <Space>
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    size="large"
                    className="text-5xl absolute top-[50%] left-[50%]"
                  />
                </Space>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
