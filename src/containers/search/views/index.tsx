"use client";

import { EmptyScreen } from "@/components";
import { SearchOutlined } from "@ant-design/icons";
import { GetProps, Input, Pagination } from "antd";
import axios from "axios";
import { map } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import "../styles/search.css";
import Link from "next/link";

import { useSearchParams, useRouter } from "next/navigation";
import { Movie } from "@/types";

type Props = {
  movies: Movie;
};

type SearchProps = GetProps<typeof Input.Search>;

export const SearchComponent: React.FC<Props> = ({ movies }) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const search = useSearchParams();
  const keyword = useMemo(() => search?.get("keyword") || "", [search]);
  const page = useMemo(
    () => (search?.get("page") ? parseInt(search.get("page") as string) : 1),
    [search]
  );

  const onSearch: SearchProps["onSearch"] = useCallback(
    (value: string, _e: any) => {
      router.push(`/search?keyword=${value}`);
    },
    [value]
  );

  return (
    <div>
      <div className="container text-white">
        <div className="flex justify-center mb-6">
          <Input
            placeholder="Điền tên phim bạn muốn xem"
            onPressEnter={() => {
              onSearch(value);
            }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="bg-[#414144] bg-opacity-50 p-3 w-[400px] text-[#ffffff]"
            variant="filled"
            suffix={<SearchOutlined className="text-[#ffffff]" />}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {movies.items && movies.items.length !== 0 ? (
            map(movies.items, (movie, index) => (
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
            <div className="p-6">
              <EmptyScreen description="Không tìm thấy phim" />
            </div>
          )}
        </div>
        {movies.items && movies.items.length !== 0 ? (
          <Pagination
            size="small"
            total={movies.paginate.total_items}
            pageSize={movies.paginate.items_per_page}
            current={page}
            onChange={(page) => router.push(`?keyword=${keyword}&page=${page}`)}
            showSizeChanger={false}
            showQuickJumper={true}
            pageSizeOptions={[]}
            className="flex justify-center mt-6 !bg-opacity-70"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
