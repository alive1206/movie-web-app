import { Genre, Country, Year } from "@/components";
import {
  CaretDownOutlined,
  FacebookFilled,
  InstagramFilled,
  MenuOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { map } from "lodash";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {};

export const Navbar: React.FC<Props> = () => {
  const [toggle, setToggle] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(0);
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="bg-[#04050a] text-[#fff] py-6 px-2">
      <div className="container" ref={navbarRef}>
        <MenuOutlined
          className="hidden max-[1200px]:inline-block text-xl cursor-pointer hover:opacity-70 text-start"
          onClick={() => {
            setToggle(!toggle);
          }}
        />
        <div
          className={`navbar-wrapper max-[1200px]:transition-transform max-[1200px]:duration-300 max-[1200px]:bg-[#222222] max-[1200px]:min-h-[100vh] max-[1200px]:top-0 max-[1200px]:right-0 max-[1200px]:py-[80px] max-[1200px]:w-[40%] max-[1200px]:fixed max-[1200px]:h-screen max-[1200px]:overflow-y-auto max-[1200px]:z-50 md:block ${
            toggle
              ? "max-[1200px]:translate-x-0"
              : "max-[1200px]:translate-x-[999px]"
          }`}
        >
          <div className="flex justify-between items-center max-[1200px]:flex-col max-[1200px]:gap-3 max-[1200px]:px-6">
            <ul className="list-none flex gap-5 m-x-0 max-[1200px]:flex max-[1200px]:flex-col">
              <li>
                <Link
                  href="/"
                  className="text-white no-underline hover:text-[#e74c3c]"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-white no-underline hover:text-[#e74c3c]"
                >
                  Tìm kiếm
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="text-white no-underline hover:text-[#e74c3c]"
                >
                  Phim lẻ
                </Link>
              </li>
              <Link
                href="/series"
                className="text-white no-underline hover:text-[#e74c3c]"
              >
                Phim bộ
              </Link>
              <Link
                href="/tv-shows"
                className="text-white no-underline hover:text-[#e74c3c]"
              >
                TV shows
              </Link>
              <li className="relative">
                <span
                  className="hover:text-[#e74c3c] cursor-pointer"
                  onClick={() => {
                    activeMenu !== 1 ? setActiveMenu(1) : setActiveMenu(0);
                  }}
                >
                  Thể loại{" "}
                  <CaretDownOutlined className="text-xs align-middle" />
                </span>
                <div
                  className={
                    activeMenu === 1
                      ? `min-[1200px]:absolute min-[1200px]:w-[450px] max-[1200px]:shadow-lg max-[1200px]:rounded-md ring-1 ring-white ring-opacity-5 right-0 mt-8 z-50 bg-[#222222] rounded-sm opacity-100 duration-300 scale-100 origin-top-right`
                      : `min-[1200px]:absolute min-[1200px]:w-[450px] right-0 mt-8 z-50 bg-[#222222] rounded-sm opacity-0 duration-300 scale-0 origin-top-right max-[1200px]:hidden`
                  }
                >
                  <div className="px-1 py-1 grid grid-flow-rows grid-cols-3 justify-items-center max-[1200px]:flex max-[1200px]:flex-wrap max-[1200px]:justify-center">
                    {map(Genre, (genre, index) => (
                      <Link
                        href={`/genre/${genre.slug}`}
                        key={index}
                        className="text-white no-underline hover:opacity-90 hover:bg-[#e74c3c] hover:rounded-md"
                      >
                        <div className="text-center px-4 py-2">
                          {genre.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li className="relative">
                <span
                  className="hover:text-[#e74c3c] cursor-pointer"
                  onClick={() => {
                    activeMenu !== 2 ? setActiveMenu(2) : setActiveMenu(0);
                  }}
                >
                  Quốc gia{" "}
                  <CaretDownOutlined className="text-xs align-middle" />
                </span>
                <div
                  className={
                    activeMenu === 2
                      ? `min-[1200px]:absolute min-[1200px]:w-[450px] max-[1200px]:shadow-lg max-[1200px]:rounded-md ring-1 ring-white ring-opacity-5 right-0 mt-8 z-50 bg-[#222222] rounded-sm opacity-100 duration-300 scale-100 origin-top-right`
                      : `min-[1200px]:absolute min-[1200px]:w-[450px] right-0 mt-8 z-50 bg-[#222222] rounded-sm opacity-0 duration-300 scale-0 origin-top-right max-[1200px]:hidden`
                  }
                >
                  <div className="px-1 py-1 grid grid-flow-rows grid-cols-3 justify-items-center max-[1200px]:flex max-[1200px]:flex-wrap max-[1200px]:justify-center">
                    {map(Country, (country, index) => (
                      <Link
                        href={`/country/${country.slug}`}
                        key={index}
                        className="text-white no-underline hover:opacity-90 hover:bg-[#e74c3c] hover:rounded-md"
                      >
                        <div className="text-center px-4 py-2">
                          {country.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li className="relative">
                <span
                  className="hover:text-[#e74c3c] cursor-pointer"
                  onClick={() => {
                    activeMenu !== 3 ? setActiveMenu(3) : setActiveMenu(0);
                  }}
                >
                  Năm <CaretDownOutlined className="text-xs align-middle" />
                </span>
                <div
                  className={
                    activeMenu === 3
                      ? `min-[1200px]:absolute min-[1200px]:w-[450px] max-[1200px]:shadow-lg max-[1200px]:rounded-md ring-1 ring-white ring-opacity-5 right-0 mt-8 z-50 bg-[#222222] rounded-sm opacity-100 duration-300 scale-100 origin-top-right`
                      : `min-[1200px]:absolute min-[1200px]:w-[450px] right-0 mt-8 z-50 bg-[#222222] rounded-sm opacity-0 duration-300 scale-0 origin-top-right max-[1200px]:hidden`
                  }
                >
                  <div className="px-1 py-1 grid grid-flow-rows grid-cols-3 justify-items-center max-[1200px]:flex max-[1200px]:flex-wrap max-[1200px]:justify-center">
                    {map(Year, (year, index) => (
                      <Link
                        href={`/release/${year.slug}`}
                        key={index}
                        className="text-white no-underline hover:opacity-90 hover:bg-[#e74c3c] hover:rounded-md"
                      >
                        <div className="text-center px-4 py-2">{year.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-8">
              <ul className="flex list-none gap-5 max-[1200px]:hidden">
                <li>
                  <InstagramFilled
                    className="text-lg cursor-pointer hover:text-[#e74c3c]"
                    title="Instagram"
                  />
                </li>
                <li>
                  {" "}
                  <TwitterOutlined
                    className="text-lg cursor-pointer hover:text-[#e74c3c]"
                    title="Twitter"
                  />
                </li>
                <li>
                  <FacebookFilled
                    className="text-lg cursor-pointer hover:text-[#e74c3c]"
                    title="Facebook"
                  />
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
