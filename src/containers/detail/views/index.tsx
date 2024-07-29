"use client";

import { formattedDate } from "@/utils";
import { Button } from "antd";
import { map } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/detail.css";
import { PlayCircleOutlined, PlusOutlined } from "@ant-design/icons";

type Movie = {
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
  movieDetail: Movie;
};

export const Detail: React.FC<Props> = ({ movieDetail }) => {
  const [genre, setGenre] = useState<any>([]);
  const [activeTab, setActiveTab] = useState(0);
  const tabCSS =
    "text-white bg-zinc-800 cursor-pointer text-sm font-bold uppercase px-3 py-2 shadow-lg rounded block leading-normal ";

  useEffect(() => {
    const categoryKeys = Object.keys(movieDetail.category);

    categoryKeys.forEach((key) => {
      const group = movieDetail.category[key].group;
      if (group.name === "Thể loại") {
        const list = movieDetail.category[key].list;
        const genreNames = list.map((item: any) => item.name);
        const formattedGenres =
          genreNames.length > 1 ? genreNames.join(", ") : genreNames[0];
        setGenre(formattedGenres);
        console.log(genreNames);
      }
    });
  }, [movieDetail.category]);
  return (
    <div>
      <div className="container ">
        <div className="flex text-white max-md:flex-col max-md:items-center">
          <div className="w-[70%]">
            <div className="flex gap-6 bg-[#222222] p-3 rounded-sm max-md:flex-col max-md:items-center">
              <div className="max-h-auto w-[350px]">
                <img
                  className="object-cover rounded-md w-full h-full object-center"
                  src={`${movieDetail?.thumb_url}`}
                />
              </div>
              <div className="grid grid-rows-2 gap-3 w-full max-md:flex max-md:flex-col">
                <div>
                  <div className="uppercase font-bold text-xl">
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
                    <span className="text-zinc-500">Thời lượng: </span>
                    {movieDetail?.total_episodes} Tập
                  </div>
                  <div className="font-medium px-2 py-1 bg-[#A3765D] text-[14px] inline-block mt-2 mb-2 rounded-sm">
                    {movieDetail?.current_episode} {movieDetail?.language}
                  </div>
                  <div>
                    <span className="text-zinc-500">Thể loại: </span>
                    {genre}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    type="primary"
                    danger
                    href={
                      movieDetail?.current_episode.toLowerCase() === "full"
                        ? `/watch/${movieDetail?.slug}?tap=full`
                        : `/watch/${movieDetail?.slug}?tap=1`
                    }
                    className="no-underline px-3 py-5 font-medium gap-[4px]"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        ></path>
                      </svg>
                    }
                    iconPosition="start"
                  >
                    Xem Ngay
                  </Button>
                  <Button
                    type="default"
                    className="px-3 py-5 font-medium"
                    icon={<PlusOutlined />}
                    iconPosition="start"
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
            <div className="bg-[#222222] rounded-sm">
              <div className="p-3">
                {activeTab === 0 ? (
                  <>
                    <span className="uppercase text-zinc-100">
                      Danh sách tập
                    </span>
                    <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[500px] scroll-smooth snap-y snap-mandatory mt-3 max-md:justify-center max-md:max-h-[250px]">
                      {map(
                        movieDetail?.episodes[0]?.items,
                        (episode, index) => (
                          <Link
                            key={index}
                            href={`/watch/${
                              movieDetail.slug
                            }?tap=${episode.name.toLowerCase()}`}
                            className="no-underline text-white hover:opacity-70"
                          >
                            <div className="bg-[#e74c3c] rounded px-5 py-1 text-center w-[100px]">
                              {episode.name}
                            </div>
                          </Link>
                        )
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
                    <span className="uppercase text-zinc-100">Director</span>
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
          <div className="flex flex-col items-center w-[30%]">
            <h3>Phim sắp chiếu</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
