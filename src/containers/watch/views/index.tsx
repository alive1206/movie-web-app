"use client";

import { EmptyScreen } from "@/components";
import { Spin } from "antd";
import { isEmpty, map } from "lodash";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
  episodes: any[];
};

type Props = {
  chiTietPhim: Movie;
  episode: any;
};

export const Watch: React.FC<Props> = ({ chiTietPhim, episode }) => {
  const [currentEpisode, setCurrentEpisode] = useState<any>("full");
  const [loading, setLoading] = useState(true);
  // console.log(">>>>tap", episode);
  // console.log(chiTietPhim.episodes[0]);
  useEffect(() => {
    if (episode !== "full") {
      const tempEpisode = chiTietPhim?.episodes[0]?.items.find(
        (item: any) => parseInt(item.name) === episode
      );
      setCurrentEpisode(tempEpisode);
      setLoading(false);
    } else {
      const tempEpisode = chiTietPhim?.episodes[0]?.items.find(
        (item: any) => item.name.toLowerCase() === episode
      );
      console.log(tempEpisode);
      setCurrentEpisode(tempEpisode);
      setLoading(false);
    }
  }, [episode]);
  return (
    <div>
      <div className="container">
        <div className="flex justify-center">
          {loading ? (
            <Spin />
          ) : (
            <div className="relative overflow-hidden w-[65%] pt-[40%] mb-3 mt-6">
              <iframe
                title={`tap-${episode}`}
                src={
                  isEmpty(chiTietPhim?.episodes[0]?.items)
                    ? ""
                    : `${currentEpisode?.embed}`
                }
                allowFullScreen
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-md"
              ></iframe>
            </div>
          )}
        </div>
        <div className="bg-[#222222] p-4 mt-3">
          <h3 className="text-white mb-3 uppercase">Danh sách tập</h3>

          {!chiTietPhim?.episodes[0]?.items ||
          chiTietPhim?.episodes[0]?.items.length === 0 ? (
            <div className="flex justify-center">
              <EmptyScreen description="Hiện tại chưa có tập phim nào để phát" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[500px] scroll-smooth snap-y snap-mandatory">
              {map(chiTietPhim?.episodes[0]?.items, (episode, index) => (
                <Link
                  key={index}
                  href={`/watch/${chiTietPhim.slug}?tap=${episode.name}`}
                  className="no-underline text-white"
                >
                  <div className="bg-[#e74c3c] rounded px-5 py-1 text-center w-[100px]">
                    {episode.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
