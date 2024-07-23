import {
  FacebookOutlined,
  InstagramOutlined,
  MenuOutlined,
  XOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";

type Props = {};

export const Navbar: React.FC<Props> = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="bg-[#04050a] text-[#fff] py-6 px-2">
      <div className="container">
        <MenuOutlined
          className="hidden max-md:inline-block text-xl cursor-pointer hover:opacity-70 text-start "
          onClick={() => {
            setToggle(!toggle);
          }}
        />
        <div
          className={`navbar-wrapper max-md:transition-transform max-md:duration-300 max-md:bg-[#04050a] max-md:min-h-[100vh] max-md:top-0 max-md:right-0 max-md:py-[80px] max-md:w-[50%] max-md:fixed max-md:z-50 md:block ${
            toggle ? "max-md:translate-x-0" : "max-md:translate-x-[999px]"
          }`}
        >
          <div className="flex justify-between items-center max-md:flex-col max-md:gap-3">
            <ul className="list-none flex gap-5 m-x-0 max-md:flex max-md:flex-col">
              <li>
                <Link
                  href="/"
                  className="text-white no-underline hover:opacity-70"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-white no-underline hover:opacity-70"
                >
                  Tìm kiếm
                </Link>
              </li>
              <li>Phim lẻ</li>
              <li>Phim Bộ</li>
              <li>TV Shows</li>
              <li>Thể loại</li>
              <li>Quốc gia</li>
              <li>Năm</li>
            </ul>

            <div className="flex items-center gap-8">
              <ul className="flex list-none gap-5 max-lg:hidden">
                <li>
                  <InstagramOutlined className="text-lg cursor-pointer hover:opacity-70" />
                </li>
                <li>
                  {" "}
                  <XOutlined className="text-lg cursor-pointer hover:opacity-70" />
                </li>
                <li>
                  <FacebookOutlined className="text-lg cursor-pointer hover:opacity-70" />
                </li>
              </ul>
              <Button type="primary" danger>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
