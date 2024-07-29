"use client";

import { Country, InfiniteScroll } from "@/components";
import axios from "axios";
import { map } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

export const CountryComponent: React.FC<Props> = ({ slug }) => {
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState("");

  const fetchData = async (page: any) => {
    try {
      const res = await axios.get(
        `https://phim.nguonc.com/api/films/quoc-gia/${slug}/?page=${page}`
      );
      if (res.data.items.length === 0) {
        setHasMore(false);
      } else {
        setData([...data, ...res.data.items]);
      }

      return res.data.items;
    } catch (error) {
      console.log(error);
    }
  };

  const getCountry = () => {
    const country = Country.find((item: any) => item.slug === slug);
    if (country) {
      setBreadcrumb(country.name);
    } else {
      return "";
    }
  };

  useEffect(() => {
    fetchData(1);
    getCountry();
  }, []);

  const renderData = () => {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {map(data, (movie, index) => (
          <Link
            key={index}
            className="cursor-pointer w-[200px] relative z-0 text-white no-underline bg-[#181818] rounded-2xl poster-container fade-slide-in"
            href={`/detail/${movie?.slug}`}
            title={movie?.name}
          >
            <figure className=" relative w-full h-[290px] overflow-hidden rounded-2xl rounded-b-none">
              <img
                className="w-full h-full object-cover duration-500 transition-all transform-translate"
                src={`${movie?.thumb_url}`}
                alt={`${movie?.name}`}
              />
              <div className="absolute top-6">
                <div className="bg-[#A3765D] rounded-r-md px-3 text-white text-sm font-medium shadow-lg">
                  {movie?.current_episode}
                </div>
              </div>
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
    );
  };

  return (
    <div>
      <div className="container">
        <div>
          <h3 className="text-white uppercase text-lg border-l-[3px] pl-2 border-[#A3765D] mb-3">
            Phim {breadcrumb}
          </h3>
        </div>
        <InfiniteScroll
          fetchData={fetchData}
          renderData={renderData}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};
