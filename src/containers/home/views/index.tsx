"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import { useEffect, useState } from "react";
import "../styles/home.css";
import { BannerHome } from "../sections/Banner";
import { LatestHome } from "../sections/Lastest";

type Paginate = {
  current_page: number;
  total_page: number;
  total_items: number;
  items_per_page: number;
};

type Item = {
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
};

type Movie = {
  paginate: Paginate;
  items: Item[];
};

type Props = {
  phimMoi: Movie;
  phimTop: Movie;
};

export const Home: React.FC<Props> = ({ phimMoi, phimTop }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (phimMoi.items.length !== 0 && phimTop.items.length !== 0) {
      setLoading(false);
    }
  }, [phimMoi]);

  return (
    <div>
      <div className="container">
        <div className="relative w-full">
          {!loading ? (
            <>
              <BannerHome phimTop={phimTop.items} />
              <LatestHome phimMoi={phimMoi.items} />
            </>
          ) : (
            <Space>
              <Spin
                indicator={<LoadingOutlined spin />}
                size="large"
                className="text-5xl absolute top-[50%] left-[50%] text-[#ffffff]"
              />
            </Space>
          )}
        </div>
      </div>
    </div>
  );
};
