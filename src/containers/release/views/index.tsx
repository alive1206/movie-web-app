"use client";

import { Year } from "@/components";
import { Movie } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Space, Spin } from "antd";
import { map } from "lodash";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  slug: string;
  data: Movie;
};

export const YearComponent: React.FC<Props> = ({ slug, data }) => {
  const [breadcrumb, setBreadcrumb] = useState("");
  const router = useRouter();
  const search = useSearchParams();

  const page = useMemo(
    () => (search?.get("page") ? parseInt(search.get("page") as string) : 1),
    [search]
  );

  const getYear = () => {
    const year = Year.find((item: any) => item.slug === slug);
    if (year) {
      setBreadcrumb(year.name);
    } else {
      return "";
    }
  };

  useEffect(() => {
    getYear();
  }, []);

  return (
    <div>
      <div className="container">
        <div>
          <h3 className="text-white uppercase text-lg border-l-[3px] pl-2 border-[#A3765D] mb-3">
            Phim {breadcrumb}
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {data ? (
            map(data?.items, (movie, index) => (
              <Link
                key={index}
                className=" cursor-pointer w-[200px]  relative z-0 text-white no-underline bg-[#181818] rounded-2xl poster-container"
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
            ))
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

        <Pagination
          size="small"
          total={data?.paginate?.total_items}
          pageSize={data?.paginate?.items_per_page}
          current={page}
          onChange={(page) => router.push(`?page=${page}`)}
          showSizeChanger={false}
          showQuickJumper={true}
          pageSizeOptions={[]}
          className="flex justify-center mt-6 !bg-opacity-70"
        />
      </div>
    </div>
  );
};
