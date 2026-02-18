"use client";

import { formattedDate } from "@/utils";
import { Button } from "antd";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/detail.css";
import {
  CaretRightOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Movie } from "@/types";

type MovieDetail = {
  id: string;
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  category: any;
  episodes: any[];
};

type Props = {
  movieDetail: MovieDetail;
  phimThinhHanh: Movie;
};

export const Detail: React.FC<Props> = ({ movieDetail, phimThinhHanh }) => {
  const [genre, setGenre] = useState<any>([]);
  const [country, setCountry] = useState<any>([]);
  const [format, setFormat] = useState<any>([]);
  const [activeTab, setActiveTab] = useState(0);
  const tabCSS =
    "text-white bg-zinc-800 cursor-pointer text-sm font-bold uppercase px-3 py-2 shadow-lg rounded-sm block leading-normal ";

  useEffect(() => {
    const categoryKeys = Object.keys(movieDetail?.category ?? {});

    categoryKeys.forEach((key) => {
      const group = movieDetail?.category[key]?.group;
      if (group.name === "Thể loại") {
        const list = movieDetail?.category[key]?.list;
        const genreNames = list.map((item: any) => item.name);
        const formattedGenres =
          genreNames.length > 1 ? genreNames.join(", ") : genreNames[0];
        setGenre(formattedGenres);
      } else if (group.name === "Quốc gia") {
        const list = movieDetail?.category[key]?.list;
        const countryNames = list.map((item: any) => item.name);
        const formattedCountries =
          countryNames.length > 1 ? countryNames.join(", ") : countryNames[0];
        setCountry(formattedCountries);
      } else if (group.name === "Định dạng") {
        const list = movieDetail?.category[key]?.list;
        const formatNames = list.map((item: any) => item.name);
        const formattedFormart =
          formatNames.length > 1 ? formatNames.join(", ") : formatNames[0];
        setFormat(formattedFormart);
      }
    });
  }, [movieDetail?.category]);
  return (
    <div>
      <div className="container">
        <div className="flex text-white max-[992px]:flex-col gap-3 max-[992px]:items-center">
          <div className="w-[70%]">
            <div className="w-full bg-[#222222] px-3 py-2 rounded-md mb-3 flex items-center gap-3 flex-wrap">
              <Link
                href={`/`}
                className="no-underline text-zinc-400 hover:text-[#e74c3c]"
              >
                <HomeOutlined /> Trang chủ
              </Link>
              <CaretRightOutlined />
              <div>{movieDetail?.name}</div>
            </div>
            <div className="flex gap-6 bg-[#222222] p-3 rounded-md max-[992px]:flex-col max-[992px]:items-center">
              <div className="max-[992px]:w-6/12 w-5/12">
                <img
                  className="object-cover md:h-80 w-full mx-auto  rounded-md"
                  src={`${movieDetail?.thumb_url}`}
                />
              </div>
              <div className="gap-3 w-full flex flex-col justify-between">
                <div>
                  <div className="uppercase font-bold text-xl line-clamp-1">
                    {movieDetail?.name}
                  </div>
                  <div className="text-gray-400 mb-2 line-clamp-1 w-full">
                    {movieDetail?.original_name}
                  </div>
                  <div>
                    <span className="text-zinc-500">Năm phát hành: </span>
                    {formattedDate(movieDetail?.created)}
                  </div>
                  <div className="mt-2">
                    <span className="text-zinc-500">Quốc gia: </span>
                    {country}
                  </div>
                  <div className="mt-2">
                    <span className="text-zinc-500">Định dạng: </span>
                    {format}
                  </div>
                  <div className="mt-2">
                    <span className="text-zinc-500">Thời lượng: </span>
                    {movieDetail?.total_episodes} Tập
                  </div>
                  <div className="font-medium px-2 py-1 bg-[#A3765D] text-[14px] inline-block mt-2 mb-2 rounded-md">
                    {movieDetail?.current_episode} {movieDetail?.language}
                  </div>
                  <div>
                    <span className="text-zinc-500">Thể loại: </span>
                    {genre}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-end">
                  <Button
                    type="primary"
                    danger
                    href={
                      movieDetail?.current_episode.toLowerCase() === "full"
                        ? `/watch/${movieDetail?.slug}?tap=full`
                        : `/watch/${
                            movieDetail?.slug
                          }?tap=${movieDetail?.episodes[0]?.items[0]?.name.toLowerCase()}`
                    }
                    className="no-underline px-3 py-5 font-medium gap-1"
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
                  >
                    Xem Ngay
                  </Button>
                  <Button
                    type="default"
                    className="px-3 py-5 font-medium"
                    icon={<PlusOutlined />}
                  >
                    Theo Dõi
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex mb-3 mt-3 gap-2">
              <div
                onClick={() => {
                  setActiveTab(0);
                }}
                className={
                  activeTab === 0 ? `${tabCSS}` + "tab-active" : `${tabCSS}`
                }
              >
                Danh sách tập
              </div>
              <div
                onClick={() => {
                  setActiveTab(1);
                }}
                className={
                  activeTab === 1 ? `${tabCSS}` + "tab-active" : `${tabCSS}`
                }
              >
                Nội dung phim
              </div>
              <div
                onClick={() => {
                  setActiveTab(2);
                }}
                className={
                  activeTab === 2 ? `${tabCSS}` + "tab-active" : `${tabCSS}`
                }
              >
                Diễn viên
              </div>
            </div>
            <div className="bg-[#222222] rounded-md">
              <div className="p-3">
                {activeTab === 0 ? (
                  <>
                    <span className="uppercase text-zinc-100">
                      Danh sách tập
                    </span>
                    <div className="flex flex-wrap gap-3 overflow-y-auto max-h-125 scroll-smooth snap-y snap-mandatory mt-3 max-md:justify-center max-md:max-h-62.5">
                      {movieDetail?.episodes[0]?.items?.map(
                        (episode, index) => (
                          <Link
                            key={index}
                            href={`/watch/${
                              movieDetail?.slug
                            }?tap=${episode?.name?.toLowerCase()}`}
                            className="no-underline text-white hover:opacity-70 bg-neutral-700 rounded-sm px-5 py-1 text-center w-25"
                          >
                            {episode.name}
                          </Link>
                        ),
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {activeTab === 1 ? (
                  <div className="">
                    <span className="uppercase text-zinc-100">Tóm tắt</span>
                    <div
                      className="text-gray-400 mt-3"
                      dangerouslySetInnerHTML={{
                        __html: movieDetail?.description || "",
                      }}
                    ></div>
                  </div>
                ) : (
                  <></>
                )}
                {activeTab === 2 ? (
                  <>
                    <span className="uppercase text-zinc-100">Đạo diễn</span>
                    <div className="text-gray-400 mt-3 mb-3 border-b border-zinc-700 pb-1">
                      {movieDetail?.director}
                    </div>
                    <span className="uppercase text-zinc-100">Diễn viên</span>
                    <div className="text-gray-400 mt-3">
                      {movieDetail?.casts}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-[30%] max-[992px]:w-full">
            <div>
              <h3 className="uppercase border-b-2 mb-3 border-[#A3765D]">
                Phim đang chiếu
              </h3>
            </div>
            <div className="w-full flex flex-col items-center gap-3">
              {phimThinhHanh?.items?.slice(0, 5)?.map((movie, index) => (
                <Link
                  key={index}
                  className="cursor-pointer w-[90%] max-md:w-full text-gray-300 no-underline bg-[#181818] rounded-md flex gap-3 p-3"
                  href={`/detail/${movie?.slug}`}
                  title={movie?.name}
                >
                  <img
                    className="w-[36%] h-auto object-cover duration-500 transition-all transform-translate rounded-md"
                    src={`${movie?.poster_url}`}
                    alt={`${movie?.name}`}
                  />
                  <div className="text-sm font-medium truncate">
                    <div className="truncate">{movie?.name}</div>
                    <div>{formattedDate(movie?.created)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
