"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import { useEffect, useState } from "react";
import "../styles/home.css";
import { BannerHome } from "../sections/Banner";
import { LatestHome } from "../sections/Lastest";

type Props = {
  phimMoi?: any;
};

export const Home: React.FC<Props> = ({ phimMoi }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (phimMoi) {
      setLoading(false);
    }
  }, [phimMoi]);

  return (
    <div>
      <div className="container">
        <div className=" w-full">
          {!loading ? (
            <>
              <BannerHome phimMoi={phimMoi} />
              <LatestHome phimMoi={phimMoi} />
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
