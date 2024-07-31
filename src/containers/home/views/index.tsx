"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import { useEffect, useState } from "react";
import "../styles/home.css";
import { BannerHome } from "../sections/Banner";
import { LatestHome } from "../sections/Lastest";
import { Movies } from "../sections/Movies";
import { Series } from "../sections/Series";
import { TvShows } from "../sections/TvShows";
import { Movie } from "@/types";

type Props = {
  phimMoi: Movie;
  phimTop: Movie;
  phimLe: Movie;
  phimBo: Movie;
  tvShows: Movie;
};

export const Home: React.FC<Props> = ({
  phimMoi,
  phimTop,
  phimLe,
  phimBo,
  tvShows,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      phimMoi?.items?.length !== 0 &&
      phimTop?.items?.length !== 0 &&
      phimLe?.items?.length !== 0 &&
      phimBo?.items?.length !== 0 &&
      tvShows?.items?.length !== 0
    ) {
      setLoading(false);
    }
  }, [phimMoi, phimTop, phimLe, phimBo, tvShows]);

  return (
    <div>
      <div className="container">
        <div className="relative w-full">
          {!loading ? (
            <div className="flex flex-col gap-6">
              <BannerHome phimTop={phimTop.items} />
              <LatestHome phimMoi={phimMoi.items} />
              <Movies phimLe={phimLe.items} />
              <Series phimBo={phimBo.items} />
              <TvShows tvShows={tvShows.items} />
            </div>
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
